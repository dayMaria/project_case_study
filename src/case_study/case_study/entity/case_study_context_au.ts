import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CaseStudyContextAU {
  @PrimaryColumn()
  caseStudy: number;

  @PrimaryColumn()
  year: number;

  @PrimaryColumn()
  context: number;

  @PrimaryColumn()
  analysisUnit: number;
}
