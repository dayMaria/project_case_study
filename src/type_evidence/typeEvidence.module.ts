import { Module } from '@nestjs/common';
import { TypeEvidenceController } from './typeEvidence.controller';
import { TypeEvidenceService } from './typeEvidence.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeEvidence } from './typeEvidence.entity';

@Module({
  controllers: [TypeEvidenceController],
  providers: [TypeEvidenceService],
  imports: [TypeOrmModule.forFeature([TypeEvidence])],
})
export class TypeEvidenceModule {}
