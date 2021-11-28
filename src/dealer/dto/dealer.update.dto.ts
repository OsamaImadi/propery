import {
  IsString,
  IsOptional,
  IsNumber,
  IsEmail,
  MaxLength,
  MinLength,
} from 'class-validator';

export class DealerUpdateDto {

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(20)
  password: string;

  @IsString()
  @IsOptional()
  dealerCode: string;

  @IsString()
  @IsOptional()
  phoneNo: string;

  @IsString()
  @IsOptional()
  CNIC: string;

  @IsString()
  @IsOptional()
  securityCode: string;

  @IsString()
  @IsOptional()
  dealerType: string;
  
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  companyNumber: string;

  @IsString()
  @IsOptional()
  dealNumber: string;

  @IsString()
  @IsOptional()
  subDealerId: string;

  @IsNumber()
  @IsOptional()
  totalPayableAmount: number;

  @IsNumber()
  @IsOptional()
  totalRecievedAmount: number;

  @IsNumber()
  @IsOptional()
  totalRemainingAmount: number;

  @IsNumber()
  @IsOptional()
  dealId: number;
}
