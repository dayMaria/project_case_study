import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['caseStudy', 'year', 'context', 'analysisUnit'])
export class CaseStudyContextAU {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  caseStudy: number;

  @Column()
  year: number;

  @Column()
  context: number;

  @Column()
  analysisUnit: number;
}
