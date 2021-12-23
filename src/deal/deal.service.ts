import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deal } from './deal.entity';
import { DealsDto } from './dto/deal.dto';
import { PlotFiles } from './../plot-files/plot-files.entity';
import * as moment from 'moment'

@Injectable()
export class DealService {
  constructor(
    @InjectRepository(Deal) private dealRepo: Repository<Deal>,
    @InjectRepository(PlotFiles) private plotFilesRepo: Repository<PlotFiles>,
  ) { }

  async getAll() {
    let record = await this.dealRepo.find()
    return record
  }

  async getOne(id: number) {
    const deal = await this.dealRepo.findOne(id);
    if (!deal) throw new NotFoundException('No record found');
    return deal;
  }
  
  async createDealer(deal: DealsDto){
    try{
      let file = await this.plotFilesRepo.findOne({where:{fileNo: deal.fileNo}})
      if(!file) throw new NotFoundException('File not found')
      let newdeal = Deal.create(deal);
      let dealNew = await newdeal.save()

      let date = moment(dealNew.createdAt).format('MMDDYYYY');
      dealNew.invoiceId = `${date}-${dealNew.id}`

      return await dealNew.save();
    }catch(err){
      if(err.errno==1062){
        throw new ConflictException('Deal already exists')
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

}
