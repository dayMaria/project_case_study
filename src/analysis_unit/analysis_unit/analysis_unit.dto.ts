import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class AnalysisUnitDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
