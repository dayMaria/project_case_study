import { Entity, PrimaryColumn } from 'typeorm';
import { MemberType } from './member_type.enum';

@Entity()
export class Member {
  @PrimaryColumn()
  caseStudy: number;

  @PrimaryColumn()
  user: number;

  @PrimaryColumn({ enum: MemberType })
  type: MemberType;
}
