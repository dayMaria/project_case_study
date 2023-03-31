import { Module } from '@nestjs/common';
import { CaseStudyController } from './case_study/controller/case_study.controller';
import { CaseStudyService } from './case_study/services/case_study.service';

@Module({
  controllers: [CaseStudyController],
  providers: [CaseStudyService],
})
export class CaseStudyModule {}
