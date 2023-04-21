import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityModule } from './security/security.module';
import { ContextModule } from './context/context.module';
import { CaseStudyModule } from './case_study/case_study.module';
import { AnalysisUnitModule } from './analysis_unit/analysis_unit.module';
import { SystemsModule } from './systems/systems.module';
import { AnalysisUnit } from './analysis_unit/analysis_unit/entity/analysis_unit';
import { Systems } from './systems/systems-table/entity/systems';
import { Context } from './context/context/entity/context.entity';
import { Roles } from './security/roles/entity/roles';
import { Users } from './security/users/entity/users';
import { CaseStudy } from './case_study/case_study/entity/case_study';
import { CaseStudyContextAU } from './case_study/case_study/entity/case_study_context_au';
import { CaseStudyContextSystem } from './case_study/case_study/entity/case_study_context_system';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('HOST_CONN1'),
        port: config.get<number>('PORT_CONN1'),
        database: config.get('DATABASE_CONN1'),
        username: config.get('USERNAME_CONN1'),
        password: config.get('PASSWORD_CONN1'),
        entities: [
          AnalysisUnit,
          Systems,
          Context,
          Roles,
          Users,
          CaseStudy,
          CaseStudyContextAU,
          CaseStudyContextSystem,
        ],
        synchronize: true,
      }),
    }),
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
