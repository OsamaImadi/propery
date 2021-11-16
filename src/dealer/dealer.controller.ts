import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { DealerService } from './dealer.service';
import { DealerDto } from './dto/dealer.dto';
import { DealerUpdateDto } from './dto/dealer.update.dto';
import { Dealer } from './dealer.entity';
import { PgParams, PaginationParams, Pagination } from '@tfarras/nestjs-typeorm-pagination';

@Controller('dealer')
export class DealerController {
  constructor(private service: DealerService) { }

  @Get()
  async getMany(
  ) {
    return await this.service.getAll();
  }

  @Get('paginated')
  getPaginated(
    @PgParams() pg: PaginationParams,
  ): Promise<Pagination<Dealer>> {
    pg._limit = pg._limit || 10;
    pg._start = pg._start || 0;
    pg._sortBy = pg._sortBy || 'id';
    pg._order = pg._order || 'DESC';
    return Dealer.findAndPaginate(pg);
  }
 
  @Get(':id')
  getbyId(@Param() params
  ) {
    return this.service.getOne(params.id);
  }

  @Post('')
  create(
    @Body(ValidationPipe) dealer: DealerDto
  ) {
    return this.service.createDealer(dealer);
  }

  @Put('/:id')
  update(
    @Body(ValidationPipe) dealer: DealerUpdateDto,
    @Param() params
  ) {
    return this.service.updateDealer(dealer, params.id);
  }

  @Delete('/:id')
  delete(
    @Param() params
  ) {
    return this.service.deleteDealer(params.id);
  }

}
