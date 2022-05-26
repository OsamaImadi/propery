import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { PgParams, PaginationParams, Pagination } from '@tfarras/nestjs-typeorm-pagination';
import { AllotmentLetterService } from './allotment-letter.service';
import { Allotment } from './allotment..entity';
import { AllotmentDto } from './dto/allotment.dto';
import { AllotmentUpdateDto } from './dto/allotmentUpdate.dto';

@Controller('allotment-letter')
export class AllotmentLetterController {
  constructor(private service: AllotmentLetterService) { }

  @Get()
  async getMany(
  ) {
    return await this.service.getAll();
  }

  @Get('paginated')
  getPaginated(
    @PgParams() pg: PaginationParams,
  ): Promise<Pagination<Allotment>> {
    pg._limit = pg._limit || 10;
    pg._start = pg._start || 0;
    pg._sortBy = pg._sortBy || 'id';
    pg._order = pg._order || 'DESC';
    return Allotment.findAndPaginate(pg);
  }
 
  @Get(':id')
  getbyId(@Param() params
  ) {
    return this.service.getOne(params.id);
  }

  @Post('')
  create(
    @Body(ValidationPipe) society: AllotmentDto
  ) {
    return this.service.createAllotment(society);
  }

  @Put('/:id')
  update(
    @Body(ValidationPipe) society: AllotmentUpdateDto,
    @Param() params
  ) {
    return this.service.updateAllotment(society, params.id);
  }
  
  @Delete('clear')
  turncate() {
    return this.service.truncate();
  }

  @Delete('/:id')
  delete(
    @Param() params
  ) {
    return this.service.deleteAllotment(params.id);
  }
}
