import { Module } from '@nestjs/common';
import { AnalysisUnitController } from './analysis_unit/controller/analysis_unit.controller';
import { AnalysisUnitService } from './analysis_unit/services/analysis_unit.service';

@Module({
  controllers: [AnalysisUnitController],
  providers: [AnalysisUnitService],
})
export class AnalysisUnitModule {}
