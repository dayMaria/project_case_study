import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityModule } from './security/security.module';
import { ContextModule } from './context/context.module';
import { CaseStudyModule } from './case_study/case_study.module';
import { AnalysisUnitModule } from './analysis_unit/analysis_unit.module';
import { AnalysisUnit } from './analysis_unit/analysis_unit/entity/analysis_unit';
import { Context } from './context/context/entity/context.entity';
import { User } from './security/users/entity/user';
import { CaseStudy } from './case_study/case_study/entity/case_study';
import { CaseStudyContextAU } from './case_study/case_study/entity/case_study_context_au';
import { BlobModule } from './blob/blob.module';
import { NestMinioModule } from 'nestjs-minio';
import { EvidenceModule } from './evidence/evidence.module';
import { Evidence } from './evidence/entity/evidence.entity';
import { EvidenceAttachment } from './evidence/entity/evidence-attachment.entity';

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
          Evidence,
          EvidenceAttachment,
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
    EvidenceModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
