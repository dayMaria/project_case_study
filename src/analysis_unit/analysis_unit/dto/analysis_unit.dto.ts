import { IsString, IsOptional, MinLength, IsArray } from 'class-validator';

export class AnalysisUnitDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  systemsIds: number[];
}