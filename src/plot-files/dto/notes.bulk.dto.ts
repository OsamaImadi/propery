import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
} from 'class-validator';

export class NotesBulkDto {

  @IsString()
  @IsNotEmpty()
  note: string;

  @IsString()
  @IsNotEmpty()
  createdBy: string;

  @IsArray()
  @IsNotEmpty()
  ids: [];
}
