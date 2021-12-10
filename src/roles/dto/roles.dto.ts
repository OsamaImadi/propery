import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';

export class RolesDto {

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  userType: string;

  @IsBoolean()
  @IsOptional()
  endUserRegistration: boolean;

  @IsBoolean()
  @IsOptional()
  employeeRegistration: boolean;

  @IsBoolean()
  @IsOptional()
  dealerRegistration: boolean;

  @IsBoolean()
  @IsOptional()
  singleFileAddition: boolean;

  @IsBoolean()
  @IsOptional()
  bulkFileAddition: boolean;

  @IsBoolean()
  @IsOptional()
  fileUpdateWithoutPrice: boolean;

  @IsBoolean()
  @IsOptional()
  fileUpdateWithPrice: boolean;

  @IsBoolean()
  @IsOptional()
  fileDeletion: boolean;

  @IsBoolean()
  @IsOptional()
  singleFileTransfer: boolean;

  @IsBoolean()
  @IsOptional()
  bulkFileTransfer: boolean;

  @IsBoolean()
  @IsOptional()
  singleFileView: boolean;

  @IsBoolean()
  @IsOptional()
  filesGridViewLoginUser: boolean;

  @IsBoolean()
  @IsOptional()
  filesGridViewAnyUser: boolean;

  @IsBoolean()
  @IsOptional()
  assignedHistoryLoginUser: boolean;

  @IsBoolean()
  @IsOptional()
  assignedHistoryAnyUser: boolean;

}
