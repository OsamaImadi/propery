import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentPlanController } from './payment-plan.controller';
import { PaymentPlanService } from './payment-plan.service';
import { PaymentPlan } from './paymentPlan.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentPlan]),
  ],
  controllers: [PaymentPlanController],
  providers: [PaymentPlanService]
})
export class PaymentPlanModule {}
