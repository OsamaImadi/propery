import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Society } from 'src/society/entity/society.entity';
import { Repository } from 'typeorm';
import { Allotment } from './allotment..entity';
import { AllotmentDto } from './dto/allotment.dto';
import { AllotmentUpdateDto } from './dto/allotmentUpdate.dto';

@Injectable()
export class AllotmentLetterService {
  constructor(
    @InjectRepository(Allotment) private allotmentRepo: Repository<Allotment>,
  ) { }

  
  async getAll() {
    let allotment = await this.allotmentRepo.find()
    return allotment
  }

  async getOne(id: number) {
    const allotment = await this.allotmentRepo.findOne(id);
    if (!allotment) throw new NotFoundException('No allotment found');
    return allotment;
  }
  
  async createAllotment(allotment: AllotmentDto){
    try{
      let newAllotment = Allotment.create(allotment);
      
      await newAllotment.save()
      
      return newAllotment;
    }catch(err){
      if(err.errno==1062){
        throw new ConflictException('Allotment already exists')
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

  async updateAllotment(allotment: AllotmentUpdateDto, id:number){
    try{
      let allotmentExisting = await this.allotmentRepo.findOne(id)
      if(!allotmentExisting){
        throw new NotFoundException('No allotment found')
      }
      await this.allotmentRepo.update(
        id,
        allotment
      );

    return await this.allotmentRepo.findOne(id);   

    }catch(err){
      if(err.errno==1062){
        throw new ConflictException('Allotment already exists')
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

  async deleteAllotment(id:number){
    try{
      let allotmentDelete = await this.allotmentRepo.findOne(id)
      if(!allotmentDelete){
        throw new NotFoundException('No allotment found')
      }
      let deleted = await this.allotmentRepo.delete(id);
      if(deleted.affected){
        return 'allotment deleted successfully'
      }
    }catch(err){
      throw err
    }
  }

  async truncate(): Promise<void> {
    return await this.allotmentRepo.clear();
  }
}
