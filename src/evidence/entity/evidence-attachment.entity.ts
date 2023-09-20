import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Evidence } from './evidence.entity';

@Entity()
export class EvidenceAttachment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column()
  evidence: number;

  @ManyToOne(() => Evidence)
  @JoinColumn({ name: 'evidence' })
  _evidence: Evidence;
}
