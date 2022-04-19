import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionDto } from './dto/transactions.dto';
import { Transaction } from './entity/transactions.entity';
import { User } from './../user/user.entity';
import { PlotFiles } from 'src/plot-files/plot-files.entity';
import { Admin } from 'src/admin/admin.entity';
import { Dealer } from 'src/dealer/dealer.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private transactionRepo: Repository<Transaction>,
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
    @InjectRepository(Dealer) private dealerRepo: Repository<Dealer>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(PlotFiles) private plotFilesRepo: Repository<PlotFiles>,
  ) { }

  
  async getAll() {
    let record = await this.transactionRepo.find()
    return record
  }

  async getOne(id: number) {
    const transaction = await this.transactionRepo.findOne(id);
    if (!transaction) throw new NotFoundException('No record found');
    return transaction;
  }

  async createTransaction(transaction: TransactionDto){
    try{
      let seller:any
      if(transaction.sellerEntity=='admin'){
        seller = await this.adminRepo.findOne(transaction.sellerId)

      }
      if(transaction.sellerEntity=='dealer'){
        seller = await this.dealerRepo.findOne(transaction.sellerId)

      }
      if(transaction.sellerEntity=='user'){
        seller = await this.userRepo.findOne(transaction.sellerId)
      }
      if(!seller){
        throw new NotFoundException('Seller not found')
      }

      let buyer:any
      if(transaction.buyerEntity=='admin'){
        buyer = await this.adminRepo.findOne(transaction.buyerId)
      }
      if(transaction.buyerEntity=='dealer'){
        buyer = await this.dealerRepo.findOne(transaction.buyerId)
      }
      if(transaction.buyerEntity=='user'){
        buyer = await this.userRepo.findOne(transaction.buyerId)
      }
      if(!buyer){
        throw new NotFoundException('buyer not found')
      }
      const file = await this.plotFilesRepo.findOne({where:{fileNo: transaction.fileNo }});

      if(!file) throw new NotFoundException('file not found')

      let newTransaction = Transaction.create(transaction);
      
      let newTrans = await newTransaction.save()
      buyer.totalRemainingAmount = buyer.totalRemainingAmount - newTrans.remainingBalancePayable;
      await buyer.save()
      seller.totalRemainingAmount = seller.totalRemainingAmount + newTrans.remainingBalancePayable;
      await seller.save()
      newTrans.transactionId = `Tran-${newTrans.id}`
      newTrans.buyerEntity = transaction.buyerEntity;
      newTrans.sellerEntity = transaction.sellerEntity;

      if(!newTrans.status) newTrans.status == "in_progress"
      
      return await newTrans.save();
    }catch(err){
      if(err.errno==1062){
        throw new ConflictException('Transaction already exists')
      }
      if(err.errno==1364){
        throw new BadRequestException(err.message)
      }
      if(err.code==23505){
        throw new ConflictException(err.message)
      }
      throw new InternalServerErrorException(err.message)
    }

  }

  async update(id: number, trans: any) {
    const transaction = await this.transactionRepo.findOne(id);
    if (!transaction) throw new NotFoundException('No record found');
    
    if(trans.status == 'completed'){
      let ts = new Date();
      transaction.completionDate = ts.toISOString()
    }

    transaction.status = trans.status;
    transaction.remainingBalancePayable = trans.remainingBalancePayable;

    return await transaction.save()
    
  }
  
  async truncate(): Promise<void> {
    return await this.transactionRepo.clear();
  }
}
