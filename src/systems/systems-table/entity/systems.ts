import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { Context } from 'src/context/context/entity/context.entity';
import { AnalysisUnit } from 'src/analysis_unit/analysis_unit/entity/analysis_unit';

@Entity()
export class Systems extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  @IsString()
  @IsNotEmpty()
  url: string;

  @Column('text')
  @IsString()
  @IsNotEmpty()
  description: string;

  @ManyToMany(() => Context, (context) => context.systems)
  contexts: Context[];

  @ManyToMany(() => AnalysisUnit, (analysisUnits) => analysisUnits.systems)
  analysisUnits: AnalysisUnit[];
}
