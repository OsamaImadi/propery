import {
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class UserUpdateDto {

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  phoneNo: string;

  @IsString()
  @IsOptional()
  CNIC: string;
  
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  paymentPlan: string;

  @IsString()
  @IsOptional()
  occupation: string;

  @IsString()
  @IsOptional()
  address2: string;

  @IsString()
  @IsOptional()
  address1: string;

  @IsNumber()
  @IsOptional()
  totalPayableAmount: number;

  @IsNumber()
  @IsOptional()
  totalRecievedAmount: number;

  @IsNumber()
  @IsOptional()
  totalRemainingAmount: number;

  @IsString()
  @IsOptional()
  dealId: string;
}
