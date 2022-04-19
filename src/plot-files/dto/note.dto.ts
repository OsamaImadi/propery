import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
} from 'class-validator';

export class NotesDto {

  @IsString()
  @IsNotEmpty()
  fileNo: string;

  @IsString()
  @IsNotEmpty()
  note: string;

  @IsString()
  @IsNotEmpty()
  createdBy: string;
  
  @IsString()
  @IsOptional()
  creatorEntity: string;
}
