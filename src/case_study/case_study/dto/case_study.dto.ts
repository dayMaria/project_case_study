import { IsString, MinLength, IsOptional } from 'class-validator';

export class CaseStudyDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  create_date: string;

  @IsString()
  commit_date: string;

  @IsString()
  end_date: string;
}