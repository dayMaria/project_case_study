import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class AnalysisUnitTypeEvidence {
  @PrimaryColumn()
  confID: number;

  @PrimaryColumn()
  type_evidence: number;
}
