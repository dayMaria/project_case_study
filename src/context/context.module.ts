import { Module } from '@nestjs/common';
import { ContextController } from './context/controller/context.controller';
import { ContextService } from './context/services/context.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Context } from './context/entity/context.entity';

@Module({
  controllers: [ContextController],
  providers: [ContextService],
  imports: [TypeOrmModule.forFeature([Context])],
})
export class ContextModule {}
