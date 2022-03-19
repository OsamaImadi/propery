import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entity/transactions.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private transactionRepo: Repository<Transaction>,
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
