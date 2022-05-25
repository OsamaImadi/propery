import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceDto } from './dto/invoice.dto';
import { InvoiceUpdateDto } from './dto/invoiceUpdate.dto';
import { Invoice } from './invoice.entity';

@Injectable()
export class InvoiceService {
  @InjectRepository(Invoice) private invoceRepo: Repository<Invoice>

  async getAll() {
    let invoice = await this.invoceRepo.find()
    return invoice
  }

  async getOne(id: number) {
    const invoice = await this.invoceRepo.findOne(id);
    if (!invoice) throw new NotFoundException('No record found');
    return invoice;
  }
  
  async createInvoice(invoice: InvoiceDto){
    try{
      let newinvoice = Invoice.create(invoice);
      
      await newinvoice.save()
      
      return newinvoice;
    }catch(err){
      if(err.errno==1062){
        throw new ConflictException('invoice already exists')
      }
      if(err.errno==1364){
        throw new BadRequestException(err.message)
      }
      if(err.code==23505){
        throw new ConflictException(err.message)
      }
      throw new InternalServerErrorException(err.message)
    }

  }

  async updateInvoice(invoice: InvoiceUpdateDto, id:number){
    try{
      let invoiceExisting = await this.invoceRepo.findOne(id)
      if(!invoiceExisting){
        throw new NotFoundException('No record found')
      }
      await this.invoceRepo.update(
        id,
        invoice
      );

    return await this.invoceRepo.findOne(id);   

    }catch(err){
      if(err.errno==1062){
        throw new ConflictException('invoice already exists')
      }
      if(err.errno==1364){
        throw new BadRequestException(err.message)
      }
      if(err.code==23505){
        throw new ConflictException(err.message)
      }
      throw new InternalServerErrorException(err.message)
    }
  }

  async deleteInvoice(id:number){
    try{
      let invoiceDelete = await this.invoceRepo.findOne(id)
      if(!invoiceDelete){
        throw new NotFoundException('No record found')
      }
      let deleted = await this.invoceRepo.delete(id);
      if(deleted.affected){
        return 'invoice deleted successfully'
      }
    }catch(err){
      throw err
    }
  }

  async truncate(): Promise<void> {
    return await this.invoceRepo.clear();
  }
}
