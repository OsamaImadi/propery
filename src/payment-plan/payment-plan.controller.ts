import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { PgParams, PaginationParams, Pagination } from '@tfarras/nestjs-typeorm-pagination';
import { PaymentPlanDto } from './dto/paymentplan.dto';
import { PaymentPlanUpdateDto } from './dto/paymentPlanUpdate.dto';
import { PaymentPlanService } from './payment-plan.service';
import { PaymentPlan } from './paymentPlan.entity';

@Controller('payment-plan')
export class PaymentPlanController {
  constructor(private service: PaymentPlanService) { }

  @Get()
  async getMany(
  ) {
    return await this.service.getAll();
  }

  @Get('paginated')
  getPaginated(
    @PgParams() pg: PaginationParams,
  ): Promise<Pagination<PaymentPlan>> {
    pg._limit = pg._limit || 10;
    pg._start = pg._start || 0;
    pg._sortBy = pg._sortBy || 'id';
    pg._order = pg._order || 'DESC';
    return PaymentPlan.findAndPaginate(pg);
  }
 
  @Get(':id')
  getbyId(@Param() params
  ) {
    return this.service.getOne(params.id);
  }

  @Post('')
  create(
    @Body(ValidationPipe) society: PaymentPlanDto
  ) {
    return this.service.createPayment(society);
  }

  @Put('/:id')
  update(
    @Body(ValidationPipe) society: PaymentPlanUpdateDto,
    @Param() params
  ) {
    return this.service.updatePayment(society, params.id);
  }
  
  @Delete('clear')
  turncate() {
    return this.service.truncate();
  }

  @Delete('/:id')
  delete(
    @Param() params
  ) {
    return this.service.deletePayment(params.id);
  }
}
