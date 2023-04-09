import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CaseStudyContextSystem {
  @PrimaryColumn()
  caseStudy: number;

  @PrimaryColumn()
  year: number;

  @PrimaryColumn()
  context: number;

  @PrimaryColumn()
  system: number;
}
