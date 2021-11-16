import {
  IsString,
  IsOptional,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class RecordsDto {

  @IsString()
  @IsNotEmpty()
  fileNo: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  fileSecurityNo: string;

  @IsString()
  @IsNotEmpty()
  fileType: string;

  @IsString()
  @IsNotEmpty()
  projectName: string;

  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsNotEmpty()
  assignedTo: string;

  @IsString()
  @IsNotEmpty()
  assignedDate: string;

  @IsString()
  @IsNotEmpty()
  recievedBy: string;

  @IsString()
  @IsNotEmpty()
  recievedDate: string;

  @IsString()
  @IsOptional()
  companyName: string;

  @IsNumber()
  @IsNotEmpty()
  unitPrice: number;

  @IsNumber()
  @IsNotEmpty()
  minimumRequiredDeposit: number;

  @IsNumber()
  @IsOptional()
  depositPercentage: number;
}
