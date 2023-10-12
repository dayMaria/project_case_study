import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AnalysisUnitTypeEvidence {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  confID: number;

  @Column()
  type_evidence: number;
}
