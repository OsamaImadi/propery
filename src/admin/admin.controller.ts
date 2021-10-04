import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';
import { AdminUpdateDto } from './dto/adminUpdate.dto';

@Controller('admin')
export class AdminController {
  constructor(private service: AdminService) { }

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
