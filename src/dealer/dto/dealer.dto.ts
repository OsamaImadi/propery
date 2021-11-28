import {
  IsString,
  IsOptional,
  IsNumber,
  IsNotEmpty,
  IsEmail,
  MaxLength,
  MinLength,
} from 'class-validator';

export class DealerDto {

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(20)
  password: string;

  @IsString()
  @IsNotEmpty()
  dealerCode: string;

  @IsString()
  @IsNotEmpty()
  phoneNo: string;

  @IsString()
  @IsNotEmpty()
  CNIC: string;

  @IsString()
  @IsNotEmpty()
  securityCode: string;

  @IsString()
  @IsNotEmpty()
  dealerType: string;

  @IsString()
  @IsOptional()
  companyNumber: string;

  @IsString()
  @IsOptional()
  dealNumber: string;

  @IsString()
  @IsOptional()
  subDealerId: string;
  
  @IsString()
  @IsOptional()
  name: string;

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
