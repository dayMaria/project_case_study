import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
} from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';

@Entity()
export class CaseStudy extends BaseEntity {
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

  @CreateDateColumn()
  create_date: Date;

  @Column({ type: 'date' })
  commit_date: Date;

  @Column({ type: 'date' })
  end_date: Date;
}
