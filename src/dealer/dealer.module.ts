import { Module } from '@nestjs/common';
import { DealerController } from './dealer.controller';
import { DealerService } from './dealer.service';
import { Dealer } from './dealer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
  TypeOrmModule.forFeature([Dealer]),
  ],
  controllers: [DealerController],
  providers: [DealerService]
})
export class DealerModule {}
