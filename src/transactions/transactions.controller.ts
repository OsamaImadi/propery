import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entity/transactions.entity';
import { PgParams, PaginationParams, Pagination } from '@tfarras/nestjs-typeorm-pagination';
import { TransactionDto } from './dto/transactions.dto';

@Controller('transactions')
export class TransactionsController {

  constructor(private service: TransactionsService) { }

  @Get()
  async getMany(
  ) {
    return await this.service.getAll();
  }

  @Get('paginated')
  getPaginated(
    @PgParams() pg: PaginationParams,
  ): Promise<Pagination<Transaction>> {
    pg._limit = pg._limit || 10;
    pg._start = pg._start || 0;
    pg._sortBy = pg._sortBy || 'id';
    pg._order = pg._order || 'DESC';
    return Transaction.findAndPaginate(pg);
  }
 
  @Get(':id')
  getbyId(@Param() params
  ) {
    return this.service.getOne(params.id);
  }
 
  @Post()
  create(
    @Body() trans: TransactionDto,
  ) {
    return this.service.createTransaction(trans);
  }
 
  @Put(':id')
  Update(
    @Param() params,
    @Body() trans: any,
  ) {
    return this.service.update(params.id, trans);
  }
}
