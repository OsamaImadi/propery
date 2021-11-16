import {
  IsString,
  IsNotEmpty,
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
}
