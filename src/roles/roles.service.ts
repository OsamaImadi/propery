import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from './roles.entity';
import { Admin } from 'src/admin/admin.entity';
import { Dealer } from './../dealer/dealer.entity';
import { RolesDto } from './dto/roles.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles) private rolesRepo: Repository<Roles>,
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
    @InjectRepository(Dealer) private dealerRepo: Repository<Dealer>
  ) { }

  
  async getAll() {
    let roles = await this.rolesRepo.find()
    return roles
  }

  async getOne(id: number) {
    const roles = await this.rolesRepo.findOne(id);
    if (!roles) throw new NotFoundException('No roles found');
    return roles;
  }

  async getByAdminId(id: number) {
    return await this.rolesRepo.findOne({ where: { userId: id, userType: 'Admin' } });
  }

  async getByDealerId(id: number) {
    return await this.rolesRepo.findOne({ where: { userId: id, userType: 'Dealer' } });
  }
  
  async createRoles(rolesObj: RolesDto){
    try{
      let user
      if(rolesObj.userType=='admin'){
        user = await this.adminRepo.findOne(rolesObj.userId)
        let existing = await this.rolesRepo.findOne({ where: { userId: rolesObj.userId, userType: 'Admin' } });
        if(existing) throw new ConflictException("Role already defined for this user")
      }
      if(rolesObj.userType == 'dealer'){
        user = await this.dealerRepo.findOne(rolesObj.userId)
        let existing = await this.rolesRepo.findOne({ where: { userId: rolesObj.userId, userType: 'Dealer' } });
        if(existing) throw new ConflictException("Role already defined for this user")
      }
      if(!user) throw new NotFoundException('User not found')

      let role = Roles.create(rolesObj);
      await role.save()
      
      return role;
    }catch(err){
      if(err.errno==1062){
        throw new ConflictException('Role already exists')
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
  
  async updateRole(rolesObj: RolesDto, id:string | number){
    try{
      let user
      if(rolesObj.userType=='admin'){
        user = await this.adminRepo.findOne(rolesObj.userId)
      }
      if(rolesObj.userType == 'dealer'){
        user = await this.dealerRepo.findOne(rolesObj.userId)
      }
      if(!user) throw new NotFoundException('User not found')

      let role = await this.rolesRepo.update(id,rolesObj);
      if(!role.affected){
        throw new InternalServerErrorException("Something went wrong")
      }
      return await this.rolesRepo.findOne(id);
    }catch(err){
      if(err.errno==1062){
        throw new ConflictException('Role already exists')
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

  async deleteRole(id:string | number){
    try{
      let deletedRole = await this.rolesRepo.delete(id)
      if(!deletedRole.affected){
        throw new NotFoundException('Role not found')
      }
      return 'Role deleted'
    }catch(err){
      if(err.errno==1062){
        throw new ConflictException('Role already exists')
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

  async truncate(): Promise<void> {
    return await this.dealerRepo.clear();
  }
}
