import { IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  @MinLength(1)
  rol: string;
}
