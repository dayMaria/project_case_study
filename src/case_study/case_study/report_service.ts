import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaseStudyContextAU } from './entity/case_study_context_au';
import { Member } from './entity/member';
@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(CaseStudyContextAU)
    private readonly caseStudyContextAuRepository: Repository<CaseStudyContextAU>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}
  async getCaseStudyBytypeEvidence(idTypeEvidence: number) {
    //ya
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

  async getAnalysisUnitAndCaseStudyByContext(id: number) {
    //ya
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
  }

  async findCasesStudiesForMembers(id: number) {
    const result = await this.memberRepository
      .createQueryBuilder('member')
      .leftJoinAndSelect('user', 'u', 'u.id = member.user')
      .leftJoinAndSelect('case_study', 'cs', 'cs.id = member.caseStudy')
      .where('member.user = :id', { id })
      .select([
        'cs.id',
        'cs.name',
        'cs.description',
        'cs.commit_date',
        'cs.end_date',
      ])
      .getRawMany();
    return result;
  }

  async getAnalysisUnitAndCaseStudyByTypeEvidence(idTypeEvidence: number) {
    //ya
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
    //ya
    const result = await this.caseStudyContextAuRepository
      .createQueryBuilder('case_study_context_au')
      .innerJoinAndSelect(
        'analysis_unit_type_evidence',
        'aute',
        'aute.confID = case_study_context_au.id',
      )
      .innerJoinAndSelect(
        'context',
        'context',
        'context.id = case_study_context_au.context',
      )
      .innerJoinAndSelect(
        'analysis_unit',
        'au',
        'au.id = case_study_context_au.analysisUnit',
      )
      .innerJoinAndSelect('type_evidence', 'te', 'te.id = aute.type_evidence')
      .select([
        'context.name as context_name',
        'au.name as analysis_unit_name',
        'te.name as type_evidence_name',
      ])
      .getRawMany();
    return result;
  }

  async getContextAndCaseStudyByDateRange(startYear: number, endYear: number) {
    //ya
    const result = await this.caseStudyContextAuRepository
      .createQueryBuilder('case_study_context_au')
      .innerJoinAndSelect(
        'context',
        'context',
        'context.id = case_study_context_au.context',
      )
      .innerJoinAndSelect(
        'case_study',
        'caseStudy',
        'caseStudy.id = case_study_context_au.caseStudy',
      )
      .where('case_study_context_au.year BETWEEN :startYear AND :endYear', {
        startYear,
        endYear,
      })
      .groupBy('context.id, caseStudy.id')
      .orderBy('context.id, caseStudy.id')
      .select([
        'context.name as context_name',
        'caseStudy.name as caseStudy_name',
      ])
      .getRawMany();
    return result;
  }
}
