import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Roles } from './roles.entity';
import { RolesDto } from './dto/roles.dto';
import { PgParams, PaginationParams, Pagination } from '@tfarras/nestjs-typeorm-pagination';

@Controller('roles')
export class RolesController {
  constructor(private service: RolesService) { }

  @Get()
  async getMany(
  ) {
    return await this.service.getAll();
  }


  @Get('paginated')
  getPaginated(
    @PgParams() pg: PaginationParams,
  ): Promise<Pagination<Roles>> {
    pg._limit = pg._limit || 10;
    pg._start = pg._start || 0;
    pg._sortBy = pg._sortBy || 'id';
    pg._order = pg._order || 'DESC';
    return Roles.findAndPaginate(pg);
  }

  @Get('admin/:id')
  getAdmin(
    @Param() params
  ){
    return this.service.getByAdminId(params.id);
  }

  @Get('dealer/:id')
  getDealer(
    @Param() params
  ){
    return this.service.getByDealerId(params.id);
  }
 
  @Get(':id')
  getbyId(@Param() params
  ) {
    return this.service.getOne(params.id);
  }

  @Post('')
  create(
    @Body(ValidationPipe) dealer: RolesDto
  ) {
    return this.service.createRoles(dealer);
  }

  @Put('/:id')
  update(
    @Body(ValidationPipe) dealer: RolesDto,
    @Param() params
  ) {
    return this.service.updateRole(dealer, params.id);
  }
  
  @Delete('clear')
  turncate() {
    return this.service.truncate();
  }

  @Delete('/:id')
  delete(
    @Param() params
  ) {
    return this.service.deleteRole(params.id);
  }

}
