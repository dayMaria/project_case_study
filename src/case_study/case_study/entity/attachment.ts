import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Attachment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  evidence: number;
}
