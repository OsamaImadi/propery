import {
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class TransactionDto {

  @IsString()
  fileNo: string;

  @IsString()
  @IsOptional()
  invoiceId: string;

  @IsString()
  buyerId: string;

  @IsString()
  @IsOptional()
  buyerEntity: string;

  @IsString()
  sellerId: string;

  @IsString()
  @IsOptional()
  sellerEntity: string;

  @IsString()
  societyName: string;

  @IsString()
  productType: string;

  @IsString()
  plotArea: string;

  @IsString()
  @IsOptional()
  notes: string;

  @IsString()
  @IsOptional()
  status: string;
  
  @IsNumber()
  @IsOptional()
  totalPricePayable: number;

  @IsNumber()
  @IsOptional()
  remainingBalancePayable: number;
}
