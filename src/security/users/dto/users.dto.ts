import {
  IsString,
  IsBoolean,
  MinLength,
  IsArray,
  IsEmail,
} from 'class-validator';

export class UsersDto {
  @IsString()
  @MinLength(1)
  user_name: string;

  @IsString()
  @MinLength(1)
  password: string;

  @IsBoolean()
  active: boolean;

  @IsString()
  @MinLength(1)
  name: string;

  @IsEmail()
  email: string;

  @IsArray()
  rolesIds: number[];
}
