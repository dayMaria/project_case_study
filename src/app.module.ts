import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityModule } from './security/security.module';
import { ContextModule } from './context/context.module';
import { CaseStudyModule } from './case_study/case_study.module';
import { AnalysisUnitModule } from './analysis_unit/analysis_unit.module';
import {
  typeOrmConfig,
  typeormconnections,
} from './config/typeorm/typeorm.config';
import { SystemsModule } from './systems/systems.module';

const importsConn = typeormconnections.map((element) => {
  return TypeOrmModule.forRoot(element);
});

@Module({
  imports: [
    ...importsConn,
    TypeOrmModule.forRoot(typeOrmConfig),
    SecurityModule,
    ContextModule,
    CaseStudyModule,
    AnalysisUnitModule,
    SystemsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
