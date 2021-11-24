import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealController } from './deal.controller';
import { Deal } from './deal.entity';
import { PlotFiles } from './../plot-files/plot-files.entity';
import { DealService } from './deal.service';

@Module({
  
  imports: [
  TypeOrmModule.forFeature([Deal, PlotFiles]),
    ],
  controllers: [DealController],
  providers: [DealService]
})
export class DealModule {}
