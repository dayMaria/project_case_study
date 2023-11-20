import { IsString, MinLength } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @MinLength(1)
  username: string;

  @IsString()
  @MinLength(1)
  password: string;
}
