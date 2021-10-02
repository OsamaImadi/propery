import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UserUpdateDto } from './dto/userUpdate.dto';

@Controller('user')
export class UserController {
  constructor(private service: UserService) { }

  @Get()
  async getMany(
  ) {
      return await this.service.getAll();
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

  @Delete('/:id')
  delete(
    @Param() params
  ) {
    return this.service.deleteUser(params.id);
  }

}
