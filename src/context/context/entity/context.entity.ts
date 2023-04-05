import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { AnalysisUnit } from 'src/analysis_unit/analysis_unit/entity/analysis_unit';
import { CaseStudy } from 'src/case_study/case_study/entity/case_study';
import { Systems } from 'src/systems/systems-table/entity/systems';

@Entity()
export class Context extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column('text')
  @IsString()
  @IsNotEmpty()
  description: string;

  @ManyToMany(() => AnalysisUnit, (analysisUnit) => analysisUnit.contexts)
  @JoinTable()
  analysisUnits: AnalysisUnit[];

  @ManyToMany(() => CaseStudy, (caseStudy) => caseStudy.contexts)
  caseStudys: CaseStudy[];

  @ManyToMany(() => Systems, (systems) => systems.contexts)
  @JoinTable()
  systems: Systems[];
}
