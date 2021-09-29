import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlotFilesController } from './plot-files.controller';
import { PlotFiles } from './plot-files.entity';
import { PlotFilesService } from './plot-files.service';
import { Admin } from './../admin/admin.entity';

@Module({
  imports: [
TypeOrmModule.forFeature([PlotFiles, Admin]),
    ],
  controllers: [PlotFilesController],
  providers: [PlotFilesService]
})
export class PlotFilesModule {}
