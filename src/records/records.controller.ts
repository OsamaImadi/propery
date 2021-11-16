import { Controller, Get, Param } from '@nestjs/common';
import { RecordsService } from './records.service';
import { Records } from './records.entity';
import { PgParams, PaginationParams, Pagination } from '@tfarras/nestjs-typeorm-pagination';

@Controller('records')
export class RecordsController {
  constructor(private service: RecordsService) { }
  
  @Get()
  async getMany(
  ) {
    return await this.service.getAll();
  }

  @Get('paginated')
  getPaginated(
    @PgParams() pg: PaginationParams,
  ): Promise<Pagination<Records>> {
    pg._limit = pg._limit || 10;
    pg._start = pg._start || 0;
    pg._sortBy = pg._sortBy || 'id';
    pg._order = pg._order || 'DESC';
    return Records.findAndPaginate(pg);
  }
 
  @Get('file/:id')
  getbyFileId(@Param() params
  ) {
    return this.service.getByFile(params.id);
  }
 
  @Get(':id')
  getbyId(@Param() params
  ) {
    return this.service.getOne(params.id);
  }
}
