import { IsString, IsOptional, MinLength, IsArray } from 'class-validator';

export class ContextDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  analysisUnitIds: number[];

  @IsArray()
  systemsIds: number[];
}