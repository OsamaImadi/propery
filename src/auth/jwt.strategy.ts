import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './utils/jwt.payload';
import { InjectRepository } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Repository } from 'typeorm';
import { Admin } from 'src/admin/admin.entity';
dotenv.config();
const jwtSecret = "PropertyExpert";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Admin)
    private adminsRepository: Repository<Admin>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: JwtPayload){
    const { user_id } = payload;
    let user = await this.adminsRepository.findOne(user_id);
    
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
