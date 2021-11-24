import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { PgParams, PaginationParams, Pagination } from '@tfarras/nestjs-typeorm-pagination';
import { Deal } from './deal.entity';
import { DealService } from './deal.service';
import { DealsDto } from './dto/deal.dto';

@Controller('deal')
export class DealController {
  constructor(private service: DealService) { }

  @Get()
  async getMany(
  ) {
    return await this.service.getAll();
  }

  @Get('paginated')
  getPaginated(
    @PgParams() pg: PaginationParams,
  ): Promise<Pagination<Deal>> {
    pg._limit = pg._limit || 10;
    pg._start = pg._start || 0;
    pg._sortBy = pg._sortBy || 'id';
    pg._order = pg._order || 'DESC';
    return Deal.findAndPaginate(pg);
  }
 
  @Get(':id')
  getbyId(@Param() params
  ) {
    return this.service.getOne(params.id);
  }

  @Post('')
  create(
    @Body(ValidationPipe) dealer: DealsDto
  ) {
    return this.service.createDealer(dealer);
  }

}
