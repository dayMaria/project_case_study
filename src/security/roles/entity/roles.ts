import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
} from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { Users } from 'src/security/users/entity/users';

@Entity()
export class Roles extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  rol: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ManyToMany(() => Users, (user) => user.roles)
  users: Users[];
}
