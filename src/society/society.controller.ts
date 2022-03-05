import { Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { SocietyService } from './society.service';
import { Society } from './entity/society.entity';
import { SocietyDto } from './dto/society.dto';
import { SocietyUpdateDto } from './dto/societyUpdate..dto';
import { PgParams, PaginationParams, Pagination } from '@tfarras/nestjs-typeorm-pagination';

@Controller('society')
export class SocietyController {
  constructor(private service: SocietyService) { }

  @Get()
  async getMany(
  ) {
    return await this.service.getAll();
  }

  @Get('paginated')
  getPaginated(
    @PgParams() pg: PaginationParams,
  ): Promise<Pagination<Society>> {
    pg._limit = pg._limit || 10;
    pg._start = pg._start || 0;
    pg._sortBy = pg._sortBy || 'id';
    pg._order = pg._order || 'DESC';
    return Society.findAndPaginate(pg);
  }
 
  @Get(':id')
  getbyId(@Param() params
  ) {
    return this.service.getOne(params.id);
  }

  @Post('')
  create(
    @Body(ValidationPipe) society: SocietyDto
  ) {
    return this.service.createSociety(society);
  }

  @Put('/:id')
  update(
    @Body(ValidationPipe) society: SocietyUpdateDto,
    @Param() params
  ) {
    return this.service.updateSociety(society, params.id);
  }
  
  @Delete('clear')
  turncate() {
    return this.service.truncate();
  }

  @Delete('/:id')
  delete(
    @Param() params
  ) {
    return this.service.deleteSociety(params.id);
  }
}
