import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { DealerService } from './dealer.service';
import { DealerDto } from './dto/dealer.dto';
import { DealerUpdateDto } from './dto/dealer.update.dto';

@Controller('dealer')
export class DealerController {
  constructor(private service: DealerService) { }

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
