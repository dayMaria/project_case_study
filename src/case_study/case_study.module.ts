import { Module } from '@nestjs/common';
import { CaseStudyController } from './case_study/case_study.controller';
import { CaseStudyService } from './case_study/case_study.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseStudy } from './case_study/entity/case_study';
import { CaseStudyContextAU } from './case_study/entity/case_study_context_au';
import { Evidence } from './case_study/entity/evidence';
import { Attachment } from './case_study/entity/attachment';
import { AnalysisUnitTypeEvidence } from './case_study/entity/analysis_unit_type_evidence';
import { Member } from './case_study/entity/member';
import { ReportService } from './case_study/report_service';

@Module({
  controllers: [CaseStudyController],
  providers: [CaseStudyService, ReportService],
  imports: [
    TypeOrmModule.forFeature([
      CaseStudy,
      CaseStudyContextAU,
      Evidence,
      Attachment,
      AnalysisUnitTypeEvidence,
      Member,
    ]),
  ],
})
export class CaseStudyModule {}
