import {
  IsString,
  MinLength,
  MaxLength,
  Length,
  IsNotEmpty
} from 'class-validator';

export class AuthUsersDto {

  @IsString()
  @Length(3, 255)
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(5)
  @MaxLength(255)
  @IsNotEmpty()
  password: string;

}
