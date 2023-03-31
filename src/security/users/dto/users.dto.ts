import { IsString, IsBoolean, MinLength } from 'class-validator';

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
}
