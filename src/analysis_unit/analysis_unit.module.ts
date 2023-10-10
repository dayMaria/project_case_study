import { Module } from '@nestjs/common';
import { AnalysisUnitController } from './analysis_unit/analysis_unit.controller';
import { AnalysisUnitService } from './analysis_unit/analysis_unit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalysisUnit } from './analysis_unit/entity/analysis_unit';
import { CaseStudyContextAU } from 'src/case_study/case_study/entity/case_study_context_au';

@Module({
  controllers: [AnalysisUnitController],
  providers: [AnalysisUnitService],
  imports: [TypeOrmModule.forFeature([AnalysisUnit, CaseStudyContextAU])],
})
export class AnalysisUnitModule {}
