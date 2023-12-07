import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaseStudyContextAU } from './entity/case_study_context_au';
import { Member } from './entity/member';
import { Evidence } from './entity/evidence';
@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(CaseStudyContextAU)
    private readonly caseStudyContextAuRepository: Repository<CaseStudyContextAU>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(Evidence)
    private readonly evidenceRepository: Repository<Evidence>,
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

  async getCaseStudyAndContextAndAnalysisUnitAndEvidence(
    idCaseStudy: number,
    idContext: number,
    idAnalysisUnit: number,
  ) {
    const result = await this.evidenceRepository
      .createQueryBuilder('evidence')
      .leftJoinAndSelect('case_study', 'cs', 'cs.id = evidence.confiD')
      .leftJoinAndSelect(
        'case_study_context_au',
        'csca',
        'csca.caseStudy = cs.id',
      )
      .leftJoinAndSelect('context', 'c', 'csca.context = c.id')
      .leftJoinAndSelect('analysis_unit', 'au', 'csca.analysisUnit = au.id')
      .where('cs.id = :idCaseStudy', { idCaseStudy })
      .andWhere('c.id =:idContext', { idContext })
      .andWhere('au.id =:idAnalysisUnit', { idAnalysisUnit })
      .select([
        'cs.name',
        'c.name',
        'au.name',
        'evidence.label',
        'DATE(evidence.created)',
      ])
      .getRawMany();
    return result;
  }
}
