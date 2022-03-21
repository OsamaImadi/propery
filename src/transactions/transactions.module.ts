import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entity/transactions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlotFiles } from 'src/plot-files/plot-files.entity';
import { User } from './../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, User, PlotFiles]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService]
})
export class TransactionsModule {}
