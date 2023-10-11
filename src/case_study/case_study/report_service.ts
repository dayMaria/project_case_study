import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaseStudyContextAU } from './entity/case_study_context_au';
import { CaseStudyService } from './case_study.service';
@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(CaseStudyContextAU)
    private readonly caseStudyContextAuRepository: Repository<CaseStudyContextAU>,
    private readonly service: CaseStudyService,
  ) {}
  async getCaseStudyBytypeEvidence(idTypeEvidence: number) {
    const result = await this.caseStudyContextAuRepository
      .createQueryBuilder('case_study_context_au')
      .leftJoinAndSelect(
        'analysis_unit_type_evidence',
        'aute',
        'aute.confID = case_study_context_au.id',
      )
      .leftJoinAndSelect(
        'case_study',
        'caseStudy',
        'caseStudy.id = case_study_context_au.caseStudy',
      )
      .where('aute.type_evidence = :idTypeEvidence', { idTypeEvidence })
      .select(['caseStudy.name'])
      .getRawMany();
    return result;
    //const analysisUnitTypeEvidence =
    //  await this.analysisUnitTypeEvidenceRepository.find({
    //    where: { type_evidence: id },
    //  });
    //const caseStudyContextAu = await this.caseStudyContextAuRepository.find({
    //  where: { id: In(analysisUnitTypeEvidence.map((x) => x.confID)) },
    //});
    //return await this.caseStudyRepository.find({
    //  where: { id: In(caseStudyContextAu.map((x) => x.caseStudy)) },
    //});
  }

  async AnalysisUnitByContextByCaseStudy(id: number) {
    const result = await this.caseStudyContextAuRepository
      .createQueryBuilder('case_study_context_au')
      .leftJoinAndSelect(
        'analysis_unit',
        'au',
        'au.id = case_study_context_au.analysisUnit',
      )
      .leftJoinAndSelect(
        'case_study',
        'caseStudy',
        'caseStudy.id = case_study_context_au.caseStudy',
      )
      .where('case_study_context_au.context = :id', { id })
      .select(['au.name', 'caseStudy.name'])
      .getRawMany();
    return result;
    //const caseStudy = await this.caseStudyContextAuRepository.find({
    //  where: { context: id },
    //});
    //const result = [];
    //for (const c of caseStudy) {
    //  const row = this.service.findOne(c.caseStudy);
    //  result.push(row);
    //}
    //result.forEach((r) => {
    //  r.years
    //    .filter((y) => y.contexts.some((c) => c.id === id))
    //    .forEach((y) => {
    //      y.contexts = y.contexts.filter((c) => c.id === id);
    //    });
    //});
    //return result;
  }

  async getAnalysisUnitAndCaseStudyByTypeEvidence(idTypeEvidence: number) {
    const result = await this.caseStudyContextAuRepository
      .createQueryBuilder('case_study_context_au')
      .leftJoinAndSelect(
        'analysis_unit_type_evidence',
        'aute',
        'aute.confID = case_study_context_au.id',
      )
      .leftJoinAndSelect(
        'analysis_unit',
        'au',
        'au.id = case_study_context_au.analysisUnit',
      )
      .leftJoinAndSelect(
        'context',
        'context',
        'context.id = case_study_context_au.context',
      )
      .leftJoinAndSelect(
        'case_study',
        'caseStudy',
        'caseStudy.id = case_study_context_au.caseStudy',
      )
      .where('aute.type_evidence = :idTypeEvidence', { idTypeEvidence })
      .select(['au.name', 'context.name', 'caseStudy.name'])
      .getRawMany();
    //const typeEvidence = await this.analysisUnitTypeEvidenceRepository.find({
    //  where: { type_evidence: id },
    //});
    //const contextAu = await this.caseStudyContextAuRepository.find({
    //  where: { id: In(typeEvidence.map((x) => x.confID)) },
    //});
    //return await this.analysisUnitRepository.find({
    //  where: { id: In(contextAu.map((x) => x.analysisUnit)) },
    //});
    console.log(result);
    return result;
  }

  async getContextAndAnalysisUnitAndTypeEvidence() {
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

  async getContextAndCaseStudyByDateRange(startYear: number, endYear: number) {
    const result = await this.caseStudyContextAuRepository
      .createQueryBuilder('case_study_context_au')
      .leftJoinAndSelect(
        'context',
        'context',
        'context.id = case_study_context_au.context',
      )
      .leftJoinAndSelect(
        'case_study',
        'caseStudy',
        'caseStudy.id = case_study_context_au.caseStudy',
      )
      .where('case_study_context_au.year BETWEEN :startYear AND :endYear', {
        startYear,
        endYear,
      })
      .select(['context.name', 'caseStudy.name'])
      .getRawMany();
    return result;
  }
}
