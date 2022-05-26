import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllotmentLetterController } from './allotment-letter.controller';
import { AllotmentLetterService } from './allotment-letter.service';
import { Allotment } from './allotment..entity';

@Module({  
  imports: [
    TypeOrmModule.forFeature([Allotment]),
  ],
  controllers: [AllotmentLetterController],
  providers: [AllotmentLetterService]
})
export class AllotmentLetterModule {}
