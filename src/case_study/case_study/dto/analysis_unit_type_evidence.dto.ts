import { IsNumber } from 'class-validator';

export class AnalysisUnitTypeEvidenceDto {
  @IsNumber()
  confID: number;

  @IsNumber()
  type_evidence: number;
}
