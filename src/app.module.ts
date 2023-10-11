import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityModule } from './security/security.module';
import { ContextModule } from './context/context.module';
import { CaseStudyModule } from './case_study/case_study.module';
import { AnalysisUnitModule } from './analysis_unit/analysis_unit.module';
import { AnalysisUnit } from './analysis_unit/entity/analysis_unit';
import { Context } from './context/context.entity';
import { User } from './security/users/user';
import { CaseStudy } from './case_study/case_study/entity/case_study';
import { CaseStudyContextAU } from './case_study/case_study/entity/case_study_context_au';
import { BlobModule } from './blob/blob.module';
import { NestMinioModule } from 'nestjs-minio';
import { TypeEvidence } from './type_evidence/typeEvidence.entity';
import { Evidence } from './case_study/case_study/entity/evidence';
import { Attachment } from './case_study/case_study/entity/attachment';
import { AnalysisUnitTypeEvidence } from './case_study/case_study/entity/analysis_unit_type_evidence';
import { TypeEvidenceModule } from './type_evidence/typeEvidence.module';
import { Member } from './case_study/case_study/entity/member';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
          Context,
          User,
          CaseStudy,
          CaseStudyContextAU,
          TypeEvidence,
          Evidence,
          Attachment,
          AnalysisUnitTypeEvidence,
          Member,
        ],
        synchronize: true,
      }),
    }),
    NestMinioModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        endPoint: config.get<string>('MINIO_ENDPOINT'),
        port: parseInt(config.get<string>('MINIO_PORT')),
        accessKey: config.get<string>('MINIO_ACCESS_KEY'),
        secretKey: config.get<string>('MINIO_SECRET_KEY'),
        useSSL: false,
      }),
    }),
    BlobModule,
    SecurityModule,
    ContextModule,
    CaseStudyModule,
    AnalysisUnitModule,
    TypeEvidenceModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
