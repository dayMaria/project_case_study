import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { Roles } from 'src/security/roles/entity/roles';

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  user_name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column()
  active: boolean;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @ManyToMany(() => Roles, (roles) => roles.users)
  @JoinTable()
  roles: Roles[];
}
