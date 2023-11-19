import { IsString, MinLength, IsOptional, IsArray } from 'class-validator';

export interface ContextDto {
  id: number;
  aus: number[];
}

export interface YearsDto {
  year: number;
  contexts: ContextDto[];
}

export class CaseStudyDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  commit_date: string;

  @IsString()
  @IsOptional()
  end_date?: string;

  @IsArray()
  years: YearsDto[];

  @IsArray()
  users: number[];
}
