import {
  IsString,
  IsOptional,
  IsNotEmpty
} from 'class-validator';

export class AllotmentDto {

  @IsString()
  @IsNotEmpty()
  fileNo: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  firstRelativeName: string;

  @IsString()
  @IsOptional()
  cnic: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  buyerId: string;

  @IsString()
  @IsOptional()
  buyerEntity: string;

  @IsString()
  @IsOptional()
  sellerId: string;

  @IsString()
  @IsOptional()
  sellerEntity: string;

  @IsString()
  @IsOptional()
  transactionId: string;

  @IsString()
  @IsOptional()
  securityCode: string;

  @IsString()
  @IsOptional()
  fileType: string;

  @IsString()
  @IsOptional()
  plotSize: string;

  @IsString()
  @IsOptional()
  societyName: string;

  @IsString()
  @IsOptional()
  societyId: string;

}
