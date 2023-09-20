import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TypeEvidence {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;
}
