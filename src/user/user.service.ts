import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
  ) { }

  
  async getAll() {
    let record = await this.userRepo.find()
    return record
  }

  async getOne(id: number) {
    const user = await this.userRepo.findOne(id);
    if (!user) throw new NotFoundException('No record found');
    return user;
  }
  
  async createUser(user: UserDto){
    try{
      let newuser = User.create(user);
      await newuser.save()
      
      return newuser;
    }catch(err){
      if(err.errno==1062){
        throw new ConflictException('User already exists')
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

  async updateUser(user: UserUpdateDto, id:number){
    try{
      let userExisting = await this.userRepo.findOne(id)
      if(!userExisting){
        throw new NotFoundException('No record found')
      }
      await this.userRepo.update(
        id,
        user
      );

    return await this.userRepo.findOne(id);   

    }catch(err){
      if(err.errno==1062){
        throw new ConflictException('User already exists')
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

  async deleteUser(id:number){
    try{
      let userDelete = await this.userRepo.findOne(id)
      if(!userDelete){
        throw new NotFoundException('No record found')
      }
      let deleted = await this.userRepo.delete(id);
      if(deleted.affected){
        return 'User deleted successfully'
      }
    }catch(err){
      throw err
    }
  }
}
