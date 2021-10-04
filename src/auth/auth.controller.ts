import { Body, Controller, Get, HttpCode, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthUsersDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) { }

  @Get('test')
  @UseGuards(AuthGuard())
  async getMany(
  ) {
    return 'Authentication successfull'
  }
 
  @Post('/admin/login')
  @HttpCode(200)
  signInAdmin(
    @Body(ValidationPipe) authCredentialsDto: AuthUsersDto,
  ): Promise<{ token: string; data: any }> {
    return this.service.signInAdmin(authCredentialsDto);
  }
}
