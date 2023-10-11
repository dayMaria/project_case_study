import { Module } from '@nestjs/common';
import { ContextController } from './context.controller';
import { ContextService } from './context.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Context } from './context.entity';
import { CaseStudyContextAU } from 'src/case_study/case_study/entity/case_study_context_au';

@Module({
  controllers: [ContextController],
  providers: [ContextService],
  imports: [TypeOrmModule.forFeature([Context, CaseStudyContextAU])],
})
export class ContextModule {}
