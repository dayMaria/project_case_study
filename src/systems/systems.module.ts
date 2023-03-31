import { Module } from '@nestjs/common';
import { SystemsController } from './systems-table/controller/systems.controller';
import { SystemsService } from './systems-table/services/systems.service';

@Module({
  controllers: [SystemsController],
  providers: [SystemsService]
})
export class SystemsModule {}
