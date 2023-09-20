import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Evidence } from './entity/evidence.entity';
import { Repository } from 'typeorm';
import { EvidenceDto } from './dto/evidence.dto';
import { EvidenceAttachment } from './entity/evidence-attachment.entity';
import { BlobService } from 'src/blob/blob.service';

@Injectable()
export class EvidenceService {
  constructor(
    @InjectRepository(Evidence)
    private readonly evidenceRepository: Repository<Evidence>,
    @InjectRepository(EvidenceAttachment)
    private readonly evidenceAttachmentRepository: Repository<EvidenceAttachment>,
    private readonly blobService: BlobService,
  ) {}

  async attachFile(name: string, buffer: Buffer, evidence: number) {
    const attachment = await this.evidenceAttachmentRepository.save({
      name,
      evidence,
    });
    const extIndex = name.lastIndexOf('.');
    await this.blobService.upload(`${attachment.id}.${extIndex + 1}`, buffer);
  }
  async create(createEvidenceDto: EvidenceDto) {
    const evidence = this.evidenceRepository.create(createEvidenceDto);
    await this.evidenceRepository.save(evidence);
    return evidence;
  }

  async findAll() {
    return await this.evidenceRepository.find();
  }

  findAllAttachments(evidence: number) {
    return this.evidenceAttachmentRepository.find({ where: { evidence } });
  }

  async findOne(id: number) {
    const found = await this.evidenceRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Evidence with id ${id} not found`);
    }
    return found;
  }

  async update(id: number, createEvidenceDto: EvidenceDto) {
    if (await this.findOne(id)) {
      await this.evidenceRepository.update(id, createEvidenceDto);
    }
  }

  async remove(id: number) {
    const deleteEvidence = await this.evidenceRepository.delete(id);
    if (!deleteEvidence.affected) {
      throw new NotFoundException(`Evidence with id ${id} not found`);
    }
  }
}
