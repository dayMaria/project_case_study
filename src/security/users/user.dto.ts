import { IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  @MinLength(1)
  username: string;

  @IsString()
  @MinLength(1)
  password: string;

  @IsString()
  rol: string;
}
