import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class AdminUpdateDto {

  @IsString()
  @IsOptional()
  email: string;

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

  @IsBoolean()
  @IsOptional()
  isAdmin: boolean;
}
