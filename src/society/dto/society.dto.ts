import {
  IsString,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class SocietyDto {

  @IsString()
  @IsNotEmpty()
  societyName: string;

  @IsString()
  @IsNotEmpty()
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
