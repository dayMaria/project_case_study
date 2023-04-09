import { Module } from '@nestjs/common';
import { SystemsController } from './systems-table/controller/systems.controller';
import { SystemsService } from './systems-table/services/systems.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Systems } from './systems-table/entity/systems';

@Module({
  controllers: [SystemsController],
  providers: [SystemsService],
  imports: [TypeOrmModule.forFeature([Systems])],
})
export class SystemsModule {}
