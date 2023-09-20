import { Module } from '@nestjs/common';
import { UserController } from './users/controller/user.controller';
import { UserService } from './users/services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class SecurityModule {}
