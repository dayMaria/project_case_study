import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { Context } from '../../../context/context/entity/context.entity';
import { Systems } from 'src/systems/systems-table/entity/systems';

@Entity()
export class AnalysisUnit extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column('text')
  @IsString()
  description: string;

  @ManyToMany(() => Context, (context) => context.analysisUnits)
  contexts: Context[];

  @ManyToMany(() => Systems, (systems) => systems.analysisUnits)
  @JoinTable()
  systems: Systems[];
}
