import { Module } from '@nestjs/common';
import { AnalysisUnitController } from './analysis_unit/controller/analysis_unit.controller';
import { AnalysisUnitService } from './analysis_unit/services/analysis_unit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalysisUnit } from './analysis_unit/entity/analysis_unit';

@Module({
  controllers: [AnalysisUnitController],
  providers: [AnalysisUnitService],
  imports: [TypeOrmModule.forFeature([AnalysisUnit])],
})
export class AnalysisUnitModule {}
