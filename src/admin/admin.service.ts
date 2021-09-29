import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { AdminDto } from './dto/admin.dto';
import { AdminUpdateDto } from './dto/adminUpdate.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
  ) { }

  
  async getAll() {
    let record = await this.adminRepo.find()
    return record
  }

  async getOne(id: number) {
    const admin = await this.adminRepo.findOne(id);
    if (!admin) throw new NotFoundException('No record found');
    return admin;
  }
  
  async createAdmin(admin: AdminDto){
    try{
      let newAdmin = Admin.create(admin);
      await newAdmin.save()
      
      return newAdmin;
    }catch(err){
      if(err.errno==1062){
        throw new ConflictException('Admin already exists')
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

  async updateAdmin(admin: AdminUpdateDto, id:number){
    try{
      let adminExisting = await this.adminRepo.findOne(id)
      if(!adminExisting){
        throw new NotFoundException('No record found')
      }
      await this.adminRepo.update(
        id,
        admin
      );

    return await this.adminRepo.findOne(id);   

    }catch(err){
      if(err.errno==1062){
        throw new ConflictException('Admin already exists')
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

  async deleteAdmin(id:number){
    try{
      let adminExisting = await this.adminRepo.findOne(id)
      if(!adminExisting){
        throw new NotFoundException('No record found')
      }
      let deleted = await this.adminRepo.delete(id);
      if(deleted.affected){
        return 'Admin deleted successfully'
      }
    }catch(err){
      throw err
    }
  }
}
