import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocietyController } from './society.controller';
import { SocietyService } from './society.service';
import { Society } from './entity/society.entity';

@Module({
  imports: [
  TypeOrmModule.forFeature([Society]),
  ],
  controllers: [SocietyController],
  providers: [SocietyService]
})
export class SocietyModule {}
