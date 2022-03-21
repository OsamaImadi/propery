import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionDto } from './dto/transactions.dto';
import { Transaction } from './entity/transactions.entity';
import { User } from './../user/user.entity';
import { PlotFiles } from 'src/plot-files/plot-files.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private transactionRepo: Repository<Transaction>,
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
      const seller = await this.userRepo.findOne({where:{id: transaction.sellerId }});
      const buyer = await this.userRepo.findOne({where:{id: transaction.buyerId }});
      const file = await this.plotFilesRepo.findOne({where:{fileNo: transaction.fileNo }});

      if(!seller) throw new NotFoundException('Seller not found')
      if(!buyer) throw new NotFoundException('buyer not found')
      if(!file) throw new NotFoundException('file not found')

      let newTransaction = Transaction.create(transaction);
      
      let newTrans = await newTransaction.save()
      buyer.totalRemainingAmount = buyer.totalRemainingAmount + newTrans.remainingBalancePayable;
      await buyer.save()
      seller.totalRemainingAmount = seller.totalRemainingAmount - newTrans.remainingBalancePayable;
      await seller.save()
      newTrans.transactionId = `Tran-${newTrans.id}`

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
  
}
