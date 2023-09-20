import { Injectable, NotFoundException } from '@nestjs/common';
import { AnalysisUnitDto } from '../dto/analysis_unit.dto';
import { AnalysisUnit } from '../entity/analysis_unit';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaseStudyContextAU } from 'src/case_study/case_study/entity/case_study_context_au';

@Injectable()
export class AnalysisUnitService {
  constructor(
    @InjectRepository(AnalysisUnit)
    private readonly analysisUnitRepository: Repository<AnalysisUnit>,
    @InjectRepository(CaseStudyContextAU)
    private readonly caseStudyContextRepository: Repository<CaseStudyContextAU>,
  ) {}

  async create(createAnalysisUnitDto: AnalysisUnitDto) {
    const analysisUnit = this.analysisUnitRepository.create(
      createAnalysisUnitDto,
    );
    await this.analysisUnitRepository.save(analysisUnit);
    return analysisUnit;
  }

  async findAll() {
    return await this.analysisUnitRepository.find();
  }

  async findOne(id: number) {
    const found = await this.analysisUnitRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Analysis unit with id ${id} not found`);
    }
    return found;
  }

  async update(id: number, createAnalysisUnitDto: AnalysisUnitDto) {
    if (await this.findOne(id)) {
      await this.analysisUnitRepository.update(id, createAnalysisUnitDto);
    }
  }

  async remove(id: number) {
    if (
      await this.caseStudyContextRepository.findOne({
        where: { analysisUnit: id },
      })
    ) {
      throw new NotFoundException(
        `Can't delete analysis unit because it's assigned to a context`,
      );
    }
    const deleteAnalysisUnit = await this.analysisUnitRepository.delete(id);
    if (!deleteAnalysisUnit.affected) {
      throw new NotFoundException(`Analysis unit with id ${id} not found`);
    }
  }

  //Reporte
  async findByEvidenceType(typeEvidence: number) {
    return this.analysisUnitRepository.find({ where: { typeEvidence } });
  }
}
