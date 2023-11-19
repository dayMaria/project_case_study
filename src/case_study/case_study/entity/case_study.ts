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

  @Column()
  name: string;

  @Column('text')
  description: string;

  @CreateDateColumn()
  create_date: Date;

  @Column({ type: 'date' })
  commit_date: Date;

  @Column({ nullable: true, type: 'date' })
  end_date?: Date;
}
