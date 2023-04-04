import { IsString, IsBoolean, MinLength, IsInt } from 'class-validator';

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

  @IsInt()
  rolesId: number;
}
