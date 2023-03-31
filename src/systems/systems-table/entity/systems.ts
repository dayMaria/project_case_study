import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';

@Entity()
export class Systems {
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
}
