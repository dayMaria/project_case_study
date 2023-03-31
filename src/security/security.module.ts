import { Module } from '@nestjs/common';
import { UsersController } from './users/controller/users.controller';
import { RolesController } from './roles/controller/roles.controller';
import { UsersService } from './users/services/users.service';
import { RolesService } from './roles/services/roles.service';

@Module({
  controllers: [UsersController, RolesController],
  providers: [RolesService, UsersService],
})
export class SecurityModule {}
