import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { AnalysisUnitTypeEvidence } from './entity/analysis_unit_type_evidence';
import { CaseStudyContextAU } from './entity/case_study_context_au';
import { CaseStudy } from './entity/case_study';
import { CaseStudyService } from './case_study.service';
import { AnalysisUnit } from 'src/analysis_unit/analysis_unit/entity/analysis_unit';
import { Context } from 'src/context/context/context.entity';
@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(AnalysisUnitTypeEvidence)
    private readonly analysisUnitTypeEvidenceRepository: Repository<AnalysisUnitTypeEvidence>,
    @InjectRepository(CaseStudyContextAU)
    private readonly caseStudyContextAuRepository: Repository<CaseStudyContextAU>,
    @InjectRepository(CaseStudy)
    private readonly caseStudyRepository: Repository<CaseStudy>,
    private readonly service: CaseStudyService,
    @InjectRepository(AnalysisUnit)
    private readonly analysisUnitRepository: Repository<AnalysisUnit>,
    @InjectRepository(Context)
    private readonly contextRepository: Repository<Context>,
  ) {}
  async CaseStudyBytypeEvidence(id: number) {
    const analysisUnitTypeEvidence =
      await this.analysisUnitTypeEvidenceRepository.find({
        where: { type_evidence: id },
      });
    const caseStudyContextAu = await this.caseStudyContextAuRepository.find({
      where: { id: In(analysisUnitTypeEvidence.map((x) => x.confID)) },
    });
    return await this.caseStudyRepository.find({
      where: { id: In(caseStudyContextAu.map((x) => x.caseStudy)) },
    });
  }

  async AnalysisUnitByContextByCaseStudy(id: number) {
    const caseStudy = await this.caseStudyContextAuRepository.find({
      where: { context: id },
    });
    const result = [];
    for (const c of caseStudy) {
      const row = this.service.findOne(c.caseStudy);
      result.push(row);
    }
    result.forEach((r) => {
      r.years
        .filter((y) => y.contexts.some((c) => c.id === id))
        .forEach((y) => {
          y.contexts = y.contexts.filter((c) => c.id === id);
        });
    });
    return result;
  }

  async TypeEvidenceByAnalysisUnitByCaseStudy(id: number) {
    const typeEvidence = await this.analysisUnitTypeEvidenceRepository.find({
      where: { type_evidence: id },
    });
    const contextAu = await this.caseStudyContextAuRepository.find({
      where: { id: In(typeEvidence.map((x) => x.confID)) },
    });
    return await this.analysisUnitRepository.find({
      where: { id: In(contextAu.map((x) => x.analysisUnit)) },
    });
  }

  async ContextAUTypeEvidence() {
    const result = await this.caseStudyContextAuRepository
      .createQueryBuilder('case_study_context_au')
      .leftJoinAndSelect(
        'analysis_unit_type_evidence',
        'aute',
        'aute.confID = case_study_context_au.id',
      )
      .leftJoinAndSelect(
        'context',
        'context',
        'context.id = case_study_context_au.context',
      )
      .leftJoinAndSelect(
        'analysis_unit',
        'au',
        'au.id = case_study_context_au.analysisUnit',
      )
      .leftJoinAndSelect('type_evidence', 'te', 'te.id = aute.type_evidence')
      .select(['context.name', 'au.name', 'te.name'])
      .getRawMany();
    return result;
  }

  async YearByContextByCaseStudy(year1: number, year2: number) {
    const relationCaseStudys = await this.caseStudyContextAuRepository.find();
    const result: Partial<CaseStudyContextAU>[] = [];
    for (const year of relationCaseStudys.map((x) => x.year)) {
      if (year === year1 || year > year1 || year === year2 || year < year2)
        result.push();
      console.log(result);
    }
    const context = await this.contextRepository.find({
      where: { id: In(result.map((x) => x.context)) },
    });
    return context;
  }
}
