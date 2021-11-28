import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/admin/admin.entity';
import { Like, Repository } from 'typeorm';
import { Dealer } from './dealer.entity';
import { DealerDto } from './dto/dealer.dto';
import { DealerUpdateDto } from './dto/dealer.update.dto';

@Injectable()
export class DealerService {
  constructor(
    @InjectRepository(Dealer) private dealerRepo: Repository<Dealer>,
  ) { }

  
  async getAll() {
    let record = await this.dealerRepo.find()
    return record
  }

  async getOne(id: number) {
    const dealer = await this.dealerRepo.findOne(id);
    if (!dealer) throw new NotFoundException('No record found');
    return dealer;
  }

  async getBySearch(name: any) {
    let record = await this.dealerRepo.find({
        name: Like(`${name.name}%`)
    });
    return record
  }
  
  async createDealer(dealer: DealerDto){
    try{
      let newdealer = Dealer.create(dealer);
      
      await newdealer.save()
      
      return newdealer;
    }catch(err){
      if(err.errno==1062){
        throw new ConflictException('Dealer already exists')
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

  async updateDealer(dealer: DealerUpdateDto, id:number){
    try{
      let dealerExisting = await this.dealerRepo.findOne(id)
      if(!dealerExisting){
        throw new NotFoundException('No record found')
      }
      await this.dealerRepo.update(
        id,
        dealer
      );

    return await this.dealerRepo.findOne(id);   

    }catch(err){
      if(err.errno==1062){
        throw new ConflictException('Dealer already exists')
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

  async deleteDealer(id:number){
    try{
      let dealerDelete = await this.dealerRepo.findOne(id)
      if(!dealerDelete){
        throw new NotFoundException('No record found')
      }
      let deleted = await this.dealerRepo.delete(id);
      if(deleted.affected){
        return 'Dealer deleted successfully'
      }
    }catch(err){
      throw err
    }
  }
}
