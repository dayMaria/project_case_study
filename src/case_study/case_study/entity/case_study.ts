import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class CaseStudy extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
  name: string;

  @Column('text')
  description: string;

  @CreateDateColumn()
  create_date: Date;

  @Column({ type: 'date' })
  commit_date: Date;

  @Column({ type: 'date' })
  end_date: Date;
}
