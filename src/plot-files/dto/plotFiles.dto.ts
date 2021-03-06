import {
  IsString,
  IsOptional,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class PlotFilesDto {

  @IsString()
  @IsNotEmpty()
  fileNo: string;

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
  @IsOptional()
  assignedToEntity: string;

  @IsString()
  @IsNotEmpty()
  assignedDate: string;

  @IsString()
  @IsNotEmpty()
  recievedBy: string;

  @IsString()
  @IsOptional()
  recievedByEntity: string;

  @IsString()
  @IsNotEmpty()
  recievedDate: string;

  @IsString()
  @IsOptional()
  companyName: string;

  @IsString()
  @IsOptional()
  plotType: 'residential' | 'commercial';

  @IsNumber()
  @IsNotEmpty()
  unitPrice: number;

  @IsNumber()
  @IsNotEmpty()
  minimumRequiredDeposit: number;

  @IsNumber()
  @IsOptional()
  depositPercentage: number;

  @IsNumber()
  @IsOptional()
  discountPercentage: number;
}
