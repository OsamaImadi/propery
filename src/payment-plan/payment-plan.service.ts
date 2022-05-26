import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentPlanDto } from './dto/paymentplan.dto';
import { PaymentPlanUpdateDto } from './dto/paymentPlanUpdate.dto';
import { PaymentPlan } from './paymentPlan.entity';

@Injectable()
export class PaymentPlanService {
  constructor(
    @InjectRepository(PaymentPlan) private paymentPlanRepo: Repository<PaymentPlan>,
  ) { }

  
  async getAll() {
    let paymentPlan = await this.paymentPlanRepo.find()
    return paymentPlan
  }

  async getOne(id: number) {
    const paymentPlan = await this.paymentPlanRepo.findOne(id);
    if (!paymentPlan) throw new NotFoundException('No payment plan found');
    return paymentPlan;
  }
  
  async createPayment(paymentPlan: PaymentPlanDto){
    try{
      let newPayment = PaymentPlan.create(paymentPlan);
      
      newPayment.amountPerInstallment = paymentPlan.totalPayable / paymentPlan.paymentCycle
      
      await newPayment.save()
      
      return newPayment;
    }catch(err){
      if(err.errno==1062){
        throw new ConflictException('Payment plan already exists')
      }
      if(err.errno==1364){
        throw new BadRequestException(err.message)
      }
      if(err.code==23505){
        throw new ConflictException(err.message)
      }
      throw new InternalServerErrorException(err.message)
    }

  }

  async updatePayment(paymentPlan: PaymentPlanUpdateDto, id:number){
    try{
      let paymentPlanExisting = await this.paymentPlanRepo.findOne(id)
      if(!paymentPlanExisting){
        throw new NotFoundException('No payment plan found')
      }
      await this.paymentPlanRepo.update(
        id,
        paymentPlan
      );

    return await this.paymentPlanRepo.findOne(id);   

    }catch(err){
      if(err.errno==1062){
        throw new ConflictException('Allotment already exists')
      }
      if(err.errno==1364){
        throw new BadRequestException(err.message)
      }
      if(err.code==23505){
        throw new ConflictException(err.message)
      }
      throw new InternalServerErrorException(err.message)
    }
  }

  async deletePayment(id:number){
    try{
      let paymentDelete = await this.paymentPlanRepo.findOne(id)
      if(!paymentDelete){
        throw new NotFoundException('No payment plan found')
      }
      let deleted = await this.paymentPlanRepo.delete(id);
      if(deleted.affected){
        return 'payment plan deleted successfully'
      }
    }catch(err){
      throw err
    }
  }

  async truncate(): Promise<void> {
    return await this.paymentPlanRepo.clear();
  }
}
