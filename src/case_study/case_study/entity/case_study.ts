import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';

@Entity()
export class CaseStudy {
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

  @Column({ type: 'date' })
  create_date: Date;

  @Column({ type: 'date' })
  commit_date: Date;

  @Column({ type: 'date' })
  end_date: Date;
}
