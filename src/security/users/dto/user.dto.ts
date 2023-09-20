import {
  IsString,
  IsBoolean,
  MinLength,
  IsArray,
  IsEmail,
} from 'class-validator';

export class UserDto {
  @IsString()
  @MinLength(1)
  username: string;

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
