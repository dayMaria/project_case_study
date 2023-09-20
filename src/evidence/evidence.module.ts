import { Module } from '@nestjs/common';
import { EvidenceController } from './evidence.controller';
import { EvidenceService } from './evidence.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evidence } from './entity/evidence.entity';
import { EvidenceAttachment } from './entity/evidence-attachment.entity';

@Module({
  controllers: [EvidenceController],
  providers: [EvidenceService],
  imports: [TypeOrmModule.forFeature([Evidence, EvidenceAttachment])],
})
export class EvidenceModule {}
