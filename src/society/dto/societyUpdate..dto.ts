import {
  IsString,
  IsOptional,
  IsArray
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
