import { Module } from '@nestjs/common';
import { CaseStudyController } from './case_study/controller/case_study.controller';
import { CaseStudyService } from './case_study/services/case_study.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseStudy } from './case_study/entity/case_study';
import { CaseStudyContextAU } from './case_study/entity/case_study_context_au';
import { CaseStudyContextSystem } from './case_study/entity/case_study_context_system';

@Module({
  controllers: [CaseStudyController],
  providers: [CaseStudyService],
  imports: [
    TypeOrmModule.forFeature([
      CaseStudy,
      CaseStudyContextAU,
      CaseStudyContextSystem,
    ]),
  ],
})
export class CaseStudyModule {}
