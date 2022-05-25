import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Invoice } from './invoice.entity';
import { PgParams, PaginationParams, Pagination } from '@tfarras/nestjs-typeorm-pagination';
import { InvoiceDto } from './dto/invoice.dto';
import { InvoiceUpdateDto } from './dto/invoiceUpdate.dto';

@Controller('invoice')
export class InvoiceController {
  constructor(private service: InvoiceService) { }

  @Get()
  async getMany(
  ) {
    return await this.service.getAll();
  }

  @Get('paginated')
  getPaginated(
    @PgParams() pg: PaginationParams,
  ): Promise<Pagination<Invoice>> {
    pg._limit = pg._limit || 10;
    pg._start = pg._start || 0;
    pg._sortBy = pg._sortBy || 'id';
    pg._order = pg._order || 'DESC';
    return Invoice.findAndPaginate(pg);
  }
 
  @Get(':id')
  getbyId(@Param() params
  ) {
    return this.service.getOne(params.id);
  }

  @Post('')
  create(
    @Body(ValidationPipe) society: InvoiceDto
  ) {
    return this.service.createInvoice(society);
  }

  @Put('/:id')
  update(
    @Body(ValidationPipe) society: InvoiceUpdateDto,
    @Param() params
  ) {
    return this.service.updateInvoice(society, params.id);
  }
  
  @Delete('clear')
  turncate() {
    return this.service.truncate();
  }

  @Delete('/:id')
  delete(
    @Param() params
  ) {
    return this.service.deleteInvoice(params.id);
  }
}
