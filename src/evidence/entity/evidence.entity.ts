import { AnalysisUnit } from 'src/analysis_unit/analysis_unit/entity/analysis_unit';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Evidence {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column({ name: 'analysis_unit' })
  analysisUnit: number;

  @ManyToOne(() => AnalysisUnit)
  @JoinColumn({ name: 'analysis_unit' })
  _evidence: AnalysisUnit;
}
