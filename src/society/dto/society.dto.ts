import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsArray,
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

  @IsString()
  @IsOptional()
  ownerPhoneNumber: string;

  @IsString()
  @IsOptional()
  map: string;

  @IsString()
  @IsOptional()
  latitude: string;

  @IsString()
  @IsOptional()
  longitude: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  developerCompanyPhone: string;

  @IsString()
  @IsOptional()
  developerCompanyEmail: string;

  @IsString()
  @IsOptional()
  developerCompanyAddress: string;

  @IsArray()
  @IsOptional()
  developerCompanyPhonePreviousProjects: string[];

  @IsArray()
  @IsOptional()
  ownerPreviousProjects: string[];

}
