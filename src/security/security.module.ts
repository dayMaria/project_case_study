import { Module } from '@nestjs/common';
import { UsersController } from './users/controller/users.controller';
import { RolesController } from './roles/controller/roles.controller';
import { UsersService } from './users/services/users.service';
import { RolesService } from './roles/services/roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/entity/users';

@Module({
  controllers: [UsersController, RolesController],
  providers: [RolesService, UsersService],
  //imports: [TypeOrmModule.forFeature([Users])],
})
export class SecurityModule {}
