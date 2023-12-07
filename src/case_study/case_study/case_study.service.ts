import { Injectable, NotFoundException } from '@nestjs/common';
import { CaseStudyDto, YearsDto } from './dto/case_study.dto';
import { CaseStudy } from './entity/case_study';
import { In, Repository } from 'typeorm';
import { CaseStudyContextAU } from './entity/case_study_context_au';
import { InjectRepository } from '@nestjs/typeorm';
import { AnalysisUnitTypeEvidence } from './entity/analysis_unit_type_evidence';
import { Evidence } from './entity/evidence';
import { Attachment } from './entity/attachment';
import { RegisterEvidenceDto } from './dto/register_evidence_dto';
import { BlobService } from 'src/blob/blob.service';
import { Member } from './entity/member';
import { MemberDto } from './dto/member.dto';
import { AnalysisUnitTypeEvidenceDto } from './dto/analysis_unit_type_evidence.dto';

@Injectable()
export class CaseStudyService {
  constructor(
    @InjectRepository(CaseStudy)
    private readonly caseStudyRepository: Repository<CaseStudy>,
    @InjectRepository(CaseStudyContextAU)
    private readonly caseStudyContextAuRepository: Repository<CaseStudyContextAU>,
    @InjectRepository(AnalysisUnitTypeEvidence)
    private readonly analysisUnitTypeEvindences: Repository<AnalysisUnitTypeEvidence>,
    @InjectRepository(AnalysisUnitTypeEvidence)
    private readonly analysisUnitTypeEvidenceRepository: Repository<AnalysisUnitTypeEvidence>,
    @InjectRepository(Attachment)
    private readonly attachmentRepository: Repository<Attachment>,
    private readonly blobService: BlobService,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(Evidence)
    private readonly evidenceRepository: Repository<Evidence>,
  ) {}

  async create(createCaseStudyDto: CaseStudyDto) {
    const caseStudy = await this.caseStudyRepository.save({
      name: createCaseStudyDto.name,
      commit_date: new Date(createCaseStudyDto.commit_date),
      description: createCaseStudyDto.description,
      user: createCaseStudyDto.user,
      end_date: createCaseStudyDto.end_date
        ? new Date(createCaseStudyDto.end_date)
        : undefined,
      //create_date: new Date(),
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
    const members: Partial<Member>[] = createCaseStudyDto.users.map((u) => ({
      user: u,
      caseStudy: caseStudy.id,
    }));
    await this.memberRepository.save(members);
    return caseStudy;
  }

  async findAllCasesStudies() {
    return await this.caseStudyRepository.find();
  }
  async findAll(user: number) {
    const members = await this.memberRepository.find({
      select: ['caseStudy'],
      where: {
        user,
      },
    });
    return this.caseStudyRepository.find({
      where: [{ user }, { id: In(members.map((x) => x.caseStudy)) }],
    });
  }

  async findOne(id: number) {
    const caseStudy = await CaseStudy.findOne({
      where: { id },
    });
    if (!caseStudy) {
      throw new NotFoundException(`Case study with id ${id} not found`);
    }
    const yearsDto: YearsDto[] = [];
    const contextsAus = await this.caseStudyContextAuRepository.find({
      where: { caseStudy: id },
    });
    const members = await this.memberRepository.find({
      select: ['user'],
      where: { caseStudy: id },
    });
    const years = new Set();
    contextsAus.forEach((x) => years.add(x.year));
    years.forEach((year: number) => {
      //console.log(year);
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
          if (!yearDto.contexts.some((x) => x.id === ctxAus.context))
            yearDto.contexts.push({
              id: ctxAus.context,
              aus,
            });
        });
      yearsDto.push(yearDto);
    });
    return {
      name: caseStudy.name,
      description: caseStudy.description,
      commit_date: caseStudy.commit_date,
      end_date: caseStudy.end_date,
      years: yearsDto,
      members: members.map((m) => m.user),
    };
  }

  async update(id: number, createCaseStudyDto: CaseStudyDto) {
    if (await this.caseStudyRepository.findOne({ where: { id } })) {
      await this.caseStudyRepository.update(
        { id },
        {
          name: createCaseStudyDto.name,
          commit_date: new Date(createCaseStudyDto.commit_date),
          description: createCaseStudyDto.description,
          user: createCaseStudyDto.user,
          end_date: createCaseStudyDto.end_date
            ? new Date(createCaseStudyDto.end_date)
            : undefined,
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
      await this.caseStudyContextAuRepository.delete({ caseStudy: id });
      await this.caseStudyContextAuRepository.save(contextUas);
      return this.findOne(id);
    }
    throw new NotFoundException(`Case study with id ${id} not found`);
  }

  async addTypeEvidence(dto: AnalysisUnitTypeEvidenceDto) {
    const entity = await this.analysisUnitTypeEvindences.findOne({
      where: dto,
    });
    if (entity) {
      throw new Error('El tipo de evidencia ya esta asociado');
    }
    await this.analysisUnitTypeEvindences.save(dto);
  }

  async removeTypeEvidence(id: number) {
    const evidence = await this.analysisUnitTypeEvidenceRepository.findOne({
      where: { id },
    });
    if (evidence) throw new Error('Ya hay evidencias de este tipo registradas');
    await this.analysisUnitTypeEvidenceRepository.delete(id);
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

  async misEvidencias(id: number) {
    const members = await this.memberRepository.find({
      select: ['caseStudy'],
      where: { user: id },
    });
    return this.caseStudyContextAuRepository.find({
      select: ['caseStudy', 'context', 'analysisUnit'],
      where: {
        caseStudy: In(members.map((m) => m.caseStudy)),
      },
    });
  }

  findListId(list: number[]) {
    return this.caseStudyRepository.find({
      where: {
        id: In(list),
      },
    });
  }

  async removeEvidence(id: number) {
    await this.evidenceRepository.delete(id);
  }

  async addMember(dto: MemberDto) {
    await this.memberRepository.save(dto);
  }

  async removeMember(id: number) {
    await this.memberRepository.delete(id);
  }
}
