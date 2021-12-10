import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Roles } from './roles.entity';
import { Admin } from 'src/admin/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dealer } from 'src/dealer/dealer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dealer, Roles, Admin]),
  ],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
