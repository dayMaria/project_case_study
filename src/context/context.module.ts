import { Module } from '@nestjs/common';
import { ContextController } from './context/controller/context.controller';
import { ContextService } from './context/services/context.service';

@Module({
  controllers: [ContextController],
  providers: [ContextService],
})
export class ContextModule {}
