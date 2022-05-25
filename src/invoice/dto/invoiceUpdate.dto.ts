import {
  IsString,
  IsNumber,
  IsOptional
} from 'class-validator';

export class InvoiceUpdateDto {

  @IsString()
  @IsOptional()
  fileNo: string;

  @IsString()
  @IsOptional()
  invoiceId: string;

  @IsString()
  @IsOptional()
  transactionType: string;

  @IsString()
  @IsOptional()
  transactionId: string;

  @IsString()
  @IsOptional()
  buyerId: string;

  @IsString()
  @IsOptional()
  buyerEntityType: string;

  @IsString()
  @IsOptional()
  sellerId: string;

  @IsString()
  @IsOptional()
  sellerEntityType: string;

  @IsNumber()
  @IsOptional()
  numberOfFiles: number;

  @IsNumber()
  @IsOptional()
  minimumDepositDiscount: number;

  @IsNumber()
  @IsOptional()
  totalPayableAmount: number;

  @IsNumber()
  @IsOptional()
  amountPaidUpfront: number;

  @IsNumber()
  @IsOptional()
  remainingPayableAmount: number;

}
