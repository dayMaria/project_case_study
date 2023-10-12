import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MemberType } from './member_type.enum';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  caseStudy: number;

  @Column()
  user: number;

  @Column({ enum: MemberType })
  type: MemberType;
}
