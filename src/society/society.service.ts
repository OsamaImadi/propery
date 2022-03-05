import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Society } from './entity/society.entity';
import { SocietyDto } from './dto/society.dto';
import { SocietyUpdateDto } from './dto/societyUpdate..dto';

@Injectable()
export class SocietyService {
  constructor(
    @InjectRepository(Society) private societyRepo: Repository<Society>,
  ) { }

  
  async getAll() {
    let record = await this.societyRepo.find()
    return record
  }

  async getOne(id: number) {
    const society = await this.societyRepo.findOne(id);
    if (!society) throw new NotFoundException('No record found');
    return society;
  }
  
  async createSociety(society: SocietyDto){
    try{
      let newsociety = Society.create(society);
      
      await newsociety.save()
      
      return newsociety;
    }catch(err){
      if(err.errno==1062){
        throw new ConflictException('Society already exists')
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

  async updateSociety(society: SocietyUpdateDto, id:number){
    try{
      let societyExisting = await this.societyRepo.findOne(id)
      if(!societyExisting){
        throw new NotFoundException('No record found')
      }
      await this.societyRepo.update(
        id,
        society
      );

    return await this.societyRepo.findOne(id);   

    }catch(err){
      if(err.errno==1062){
        throw new ConflictException('Society already exists')
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

  async deleteSociety(id:number){
    try{
      let societyDelete = await this.societyRepo.findOne(id)
      if(!societyDelete){
        throw new NotFoundException('No record found')
      }
      let deleted = await this.societyRepo.delete(id);
      if(deleted.affected){
        return 'Society deleted successfully'
      }
    }catch(err){
      throw err
    }
  }

  async truncate(): Promise<void> {
    return await this.societyRepo.clear();
  }
}
