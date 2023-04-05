import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { Context } from 'src/context/context/entity/context.entity';

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

  @Column({ type: 'date' })
  create_date: Date;

  @Column({ type: 'date' })
  commit_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @ManyToMany(() => Context, (context) => context.caseStudys)
  @JoinTable()
  contexts: Context[];
}
