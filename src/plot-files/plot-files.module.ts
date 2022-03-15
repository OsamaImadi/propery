import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlotFilesController } from './plot-files.controller';
import { PlotFiles } from './plot-files.entity';
import { PlotFilesService } from './plot-files.service';
import { FileNotes } from './file-note.entity';
import { Admin } from './../admin/admin.entity';
import { Dealer } from './../dealer/dealer.entity';
import { Society } from './../society/entity/society.entity';
import { User } from './../user/user.entity';

@Module({
  imports: [
  TypeOrmModule.forFeature([PlotFiles, Admin, FileNotes, Dealer, User, Society]),
    ],
  controllers: [PlotFilesController],
  providers: [PlotFilesService]
})
export class PlotFilesModule {}
