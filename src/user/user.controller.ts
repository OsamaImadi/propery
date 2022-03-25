import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { User } from './user.entity';
import { PgParams, PaginationParams, Pagination } from '@tfarras/nestjs-typeorm-pagination';

@Controller('user')
export class UserController {
  constructor(private service: UserService) { }

  @Get()
  async getMany(
  ) {
    return await this.service.getAll();
  }

  @Get('paginated')
  getPaginated(
    @PgParams() pg: PaginationParams,
  ): Promise<Pagination<User>> {
    pg._limit = pg._limit || 10;
    pg._start = pg._start || 0;
    pg._sortBy = pg._sortBy || 'id';
    pg._order = pg._order || 'DESC';
    return User.findAndPaginate(pg);
  }
 
  @Get(':id')
  getbyId(@Param() params
  ) {
    return this.service.getOne(params.id);
  }

  @Post('')
  create(
    @Body(ValidationPipe) user: UserDto
  ) {
    return this.service.createUser(user);
  }

  @Put('/:id')
  update(
    @Body(ValidationPipe) user: UserUpdateDto,
    @Param() params
  ) {
    return this.service.updateUser(user, params.id);
  }

  @Delete('/clear')
  deleteAll(
    @Param() params
  ) {
    return this.service.truncate();
  }

  @Delete('/:id')
  delete(
    @Param() params
  ) {
    return this.service.deleteUser(params.id);
  }

}
