import { Injectable, NotFoundException } from '@nestjs/common';
import { CaseStudyDto, YearsDto } from './dto/case_study.dto';
import { CaseStudy } from './entity/case_study';
import { Repository } from 'typeorm';
import { CaseStudyContextAU } from './entity/case_study_context_au';
import { InjectRepository } from '@nestjs/typeorm';
import { AnalysisUnitTypeEvidence } from './entity/analysis_unit_type_evidence';
import { Evidence } from './entity/evidence';
import { Attachment } from './entity/attachment';
import { RegisterEvidenceDto } from './dto/register_evidence_dto';
import { BlobService } from 'src/blob/blob.service';
import { Member } from './entity/member';

@Injectable()
export class CaseStudyService {
  constructor(
    @InjectRepository(CaseStudy)
    private readonly caseStudyRepository: Repository<CaseStudy>,
    @InjectRepository(CaseStudyContextAU)
    private readonly caseStudyContextAuRepository: Repository<CaseStudyContextAU>,
    @InjectRepository(AnalysisUnitTypeEvidence)
    private readonly analysisUnitTypeEvindences: Repository<AnalysisUnitTypeEvidence>,
    @InjectRepository(Evidence)
    private readonly evidenceRepository: Repository<Evidence>,
    @InjectRepository(Attachment)
    private readonly attachmentRepository: Repository<Attachment>,
    private readonly blobService: BlobService,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async create(createCaseStudyDto: CaseStudyDto) {
    const caseStudy = await this.caseStudyRepository.save({
      name: createCaseStudyDto.name,
      commit_date: createCaseStudyDto.commit_date,
      description: createCaseStudyDto.description,
      end_date: createCaseStudyDto.end_date,
    });
    const contextUas: Partial<CaseStudyContextAU>[] = [];
    for (const year of createCaseStudyDto.years) {
      for (const ctx of year.contexts) {
        for (const au of ctx.aus) {
          contextUas.push({
            caseStudy: caseStudy.id,
            year: year.year,
            context: ctx.id,
            analysisUnit: au,
          });
        }
      }
    }
    await this.caseStudyContextAuRepository.save(contextUas);
    return caseStudy;
  }

  async findAll() {
    return await this.caseStudyRepository.find();
  }

  async findOne(id: number) {
    const caseStudy = await this.caseStudyRepository.findOne({
      where: { id },
    });
    if (!caseStudy) {
      throw new NotFoundException(`Case study with id ${id} not found`);
    }
    const yearsDto: YearsDto[] = [];
    const contextsAus = await this.caseStudyContextAuRepository.find({
      where: { caseStudy: id },
    });
    const years = new Set();
    years.forEach((year: number) => {
      const yearDto: YearsDto = {
        year,
        contexts: [],
      };
      contextsAus
        .filter((c) => c.year === year)
        .forEach((ctxAus) => {
          const aus = contextsAus
            .filter((c) => c.year === year && c.context === ctxAus.context)
            .map((c) => c.analysisUnit);
          if (!yearDto.contexts.some((c) => c.id === ctxAus.context)) {
            yearDto.contexts.push({
              id: ctxAus.context,
              aus,
            });
          }
        });
      yearsDto.push(yearDto);
    });
    return {
      id: caseStudy.id,
      name: caseStudy.name,
      description: caseStudy.description,
      commit_date: caseStudy.commit_date,
      end_date: caseStudy.end_date,
      years: yearsDto,
    };
  }

  async update(id: number, createCaseStudyDto: CaseStudyDto) {
    if (await this.caseStudyRepository.findOne({ where: { id } })) {
      await this.caseStudyRepository.update(
        { id },
        {
          name: createCaseStudyDto.name,
          commit_date: createCaseStudyDto.commit_date,
          description: createCaseStudyDto.description,
          end_date: createCaseStudyDto.end_date,
        },
      );
      const contextUas: Partial<CaseStudyContextAU>[] = [];
      for (const year of createCaseStudyDto.years) {
        for (const ctx of year.contexts) {
          for (const au of ctx.aus) {
            contextUas.push({
              caseStudy: id,
              year: year.year,
              context: ctx.id,
              analysisUnit: au,
            });
          }
        }
      }
      await this.caseStudyContextAuRepository.save(contextUas);
      return this.findOne(id);
    }
    throw new NotFoundException(`Case study with id ${id} not found`);
  }

  async addTypeEvidence(dto: AnalysisUnitTypeEvidence) {
    const entity = await this.analysisUnitTypeEvindences.findOne({
      where: dto,
    });
    if (entity) {
      throw new Error('El tipo de evidencia ya esta asociado');
    }
    await this.analysisUnitTypeEvindences.save(dto);
  }

  async removeTypeEvidence(dto: AnalysisUnitTypeEvidence) {
    const evidence = await this.evidenceRepository.findOne({
      where: {
        confiD: dto.confID,
        typeEvidence: dto.type_evidence,
      },
    });
    if (evidence) throw new Error('Ya hay evidencias de este tipo registradas');
    await this.evidenceRepository.delete({
      confiD: dto.confID,
      typeEvidence: dto.type_evidence,
    });
  }

  async registerEvidence(dto: RegisterEvidenceDto) {
    const evidence = await this.evidenceRepository.save({
      confiD: dto.confiD,
      typeEvidence: dto.typeEvidence,
      label: dto.label,
    });
    for (const file of dto.files) {
      const attachment = await this.attachmentRepository.save({
        evidence: evidence.id,
        fileName: file.originalname,
      });
      const dotIndex = file.originalname.lastIndexOf('.') + 1;
      await this.blobService.upload(
        `${attachment.id.toString()}.${file.originalname.substring(dotIndex)}`,
        file.buffer,
      );
    }
  }

  async removeEvidence(id: number) {
    await this.evidenceRepository.delete(id);
  }

  async addMember(dto: Member) {
    await this.memberRepository.save(dto);
  }

  async removeMember(dto: Member) {
    await this.memberRepository.delete({ ...dto });
  }
}
