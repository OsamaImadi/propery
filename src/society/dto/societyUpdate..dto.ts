import {
  IsString,
  IsOptional
} from 'class-validator';

export class SocietyUpdateDto {

  @IsString()
  @IsOptional()
  societyName: string;

  @IsString()
  @IsOptional()
  societyId: string;

  @IsString()
  @IsOptional()
  contactNo: string;

  @IsString()
  @IsOptional()
  ownerName: string;

  @IsString()
  @IsOptional()
  area: string;

  @IsString()
  @IsOptional()
  legalStatus: string;

  @IsString()
  @IsOptional()
  developerCompanyName: string;
}
