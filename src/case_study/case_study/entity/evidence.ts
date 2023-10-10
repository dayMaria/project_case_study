import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Evidence {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  confiD: number;

  @Column()
  typeEvidence: number;

  @Column()
  label: string;

  @CreateDateColumn()
  created: Date;
}
