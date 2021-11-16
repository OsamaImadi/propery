import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';
import { Records } from './records.entity';
import { PlotFiles } from 'src/plot-files/plot-files.entity';

@Module({
  imports: [
  TypeOrmModule.forFeature([Records, PlotFiles]),
  ],
  controllers: [RecordsController],
  providers: [RecordsService]
})
export class RecordsModule {}
