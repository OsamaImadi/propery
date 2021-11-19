import { Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';
import { AdminUpdateDto } from './dto/adminUpdate.dto';
import { PgParams, PaginationParams, Pagination } from '@tfarras/nestjs-typeorm-pagination';
import { Admin } from 'src/admin/admin.entity';
 

@Controller('admin')
export class AdminController {
  constructor(private service: AdminService) { }

  @Get()
  async getMany(
  ) {
    return await this.service.getAll();
  }

  @Get('search')
  async getSearch(
    @Query() query
  ) {
    return await this.service.getBySearch(query);
  }

  @Get('paginated')
  getPaginated(
    @PgParams() pg: PaginationParams,
  ): Promise<Pagination<Admin>> {
    pg._limit = pg._limit || 10;
    pg._start = pg._start || 0;
    pg._sortBy = pg._sortBy || 'id';
    pg._order = pg._order || 'DESC';
    return Admin.findAndPaginate(pg);
  }
 
  @Get(':id')
  getbyId(@Param() params
  ) {
    return this.service.getOne(params.id);
  }

  @Post('')
  create(
    @Body(ValidationPipe) admin: AdminDto
  ) {
    return this.service.createAdmin(admin);
  }

  @Put('/:id')
  update(
    @Body(ValidationPipe) admin: AdminUpdateDto,
    @Param() params
  ) {
    return this.service.updateAdmin(admin, params.id);
  }

  @Delete('/:id')
  delete(
    @Param() params
  ) {
    return this.service.deleteAdmin(params.id);
  }

}
