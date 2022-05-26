import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsNumber
} from 'class-validator';

export class PaymentPlanDto {

  @IsString()
  @IsNotEmpty()
  fileNo: string;

  @IsNumber()
  @IsNotEmpty()
  paymentCycle: number;

  @IsString()
  @IsOptional()
  firstInstallmentDueDate: string;

  @IsNumber()
  @IsOptional()
  installmentAmount: number;

  @IsNumber()
  @IsOptional()
  totalPayable: number;

  @IsString()
  @IsOptional()
  transactionId: string;
}
