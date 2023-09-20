import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AnalysisUnit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column()
  typeEvidence: number;
}
