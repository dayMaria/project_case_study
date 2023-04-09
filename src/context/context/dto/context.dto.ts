import { IsString, IsOptional, MinLength } from 'class-validator';

export class ContextDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
