import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/admin/admin.entity';
import { Repository } from 'typeorm';
import { AuthUsersDto } from './dto/auth.dto';
import { JwtPayload } from './utils/jwt.payload';
import * as bcrypt from 'bcryptjs';
import * as _ from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { Dealer } from 'src/dealer/dealer.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
    @InjectRepository(Dealer) private dealerRepo: Repository<Dealer>,
    private jwtService: JwtService,
  ) { }

  async signInAdmin(
    authUserCredentialsDto: AuthUsersDto,
  ): Promise<{ token: string; data: any }> {

    const user = await this.adminRepo.findOne({
      select: ["email", "password", "id", "isAdmin"],
      where: [{
        email: authUserCredentialsDto?.email?.toLocaleLowerCase()
      }]
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!(await bcrypt.compare(authUserCredentialsDto.password, user.password))) {
      throw new UnauthorizedException('Invalid Password');
    }

    const payload: JwtPayload = {
      email: user.email,
      user_id: user.id,
      isAdmin: user.isAdmin,
      role: 'Admin'
    };

    const token = await this.jwtService.sign(payload);
    let data: any;
    data = _.omit(user, ['password']);
    return { token, data };
  }

  async signInDealer(
    authUserCredentialsDto: AuthUsersDto,
  ): Promise<{ token: string; data: any }> {

    const user = await this.dealerRepo.findOne({
      select: ["email", "password", "id", "dealerType"],
      where: [{
        email: authUserCredentialsDto?.email?.toLocaleLowerCase()
      }]
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if(user.dealerType == 'gold'){
      throw new UnauthorizedException('You have to be a platinium member to sign in.');
    }

    if (!(await bcrypt.compare(authUserCredentialsDto.password, user.password))) {
      throw new UnauthorizedException('Invalid Password');
    }

    const payload: JwtPayload = {
      email: user.email,
      user_id: user.id,
      isAdmin: false,
      role: 'Dealer'
    };

    const token = await this.jwtService.sign(payload);
    let data: any;
    data = _.omit(user, ['password']);
    return { token, data };
  }
}
