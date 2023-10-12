import { IsEnum, IsNumber } from 'class-validator';
import { MemberType } from '../entity/member_type.enum';

export class MemberDto {
  @IsNumber()
  caseStudy: number;

  @IsNumber()
  user: number;

  @IsEnum(MemberType)
  type: MemberType;
}
