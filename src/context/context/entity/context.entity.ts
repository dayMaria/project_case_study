import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
@Entity()
export class Context extends BaseEntity {
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
}
