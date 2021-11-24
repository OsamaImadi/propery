import {
  IsString,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class DealsDto {

  @IsString()
  @IsNotEmpty()
  fileNo: string;

  @IsString()
  @IsNotEmpty()
  fileSecurityNo: string;

  @IsString()
  @IsNotEmpty()
  orderInitiationDate: string;

  @IsString()
  @IsNotEmpty()
  orderCompletionDate: string;

  @IsString()
  @IsNotEmpty()
  orderCreatedBy: string;

  @IsString()
  @IsNotEmpty()
  assignedTo: string;

  @IsString()
  @IsNotEmpty()
  recievedBy: string;

  @IsString()
  @IsNotEmpty()
  project: string;

  @IsString()
  @IsNotEmpty()
  orderStatus: string;

  @IsNumber()
  @IsNotEmpty()
  totalPayable: number;

  @IsNumber()
  @IsNotEmpty()
  minDiscount: number;

  @IsNumber()
  @IsNotEmpty()
  minDiscountPercentage: number;

}
