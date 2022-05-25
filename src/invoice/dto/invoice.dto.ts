import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional
} from 'class-validator';

export class InvoiceDto {

  @IsString()
  @IsNotEmpty()
  fileNo: string;

  @IsString()
  @IsOptional()
  invoiceId: string;

  @IsString()
  @IsNotEmpty()
  transactionType: string;

  @IsString()
  @IsNotEmpty()
  transactionId: string;

  @IsString()
  @IsNotEmpty()
  buyerId: string;

  @IsString()
  @IsNotEmpty()
  buyerEntityType: string;

  @IsString()
  @IsNotEmpty()
  sellerId: string;

  @IsString()
  @IsNotEmpty()
  sellerEntityType: string;

  @IsNumber()
  @IsNotEmpty()
  numberOfFiles: number;

  @IsNumber()
  @IsNotEmpty()
  minimumDepositDiscount: number;

  @IsNumber()
  @IsNotEmpty()
  totalPayableAmount: number;

  @IsNumber()
  @IsNotEmpty()
  amountPaidUpfront: number;

  @IsNumber()
  @IsNotEmpty()
  remainingPayableAmount: number;

}
