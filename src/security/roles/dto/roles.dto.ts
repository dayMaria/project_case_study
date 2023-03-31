import { IsOptional, IsString, MinLength } from 'class-validator';

export class RolesDto {
  @IsString()
  @MinLength(1)
  rol: string;

  @IsString()
  @IsOptional()
  description: string;
}
