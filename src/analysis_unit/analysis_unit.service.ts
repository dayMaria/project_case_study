import { Injectable, NotFoundException } from '@nestjs/common';
import { AnalysisUnitDto } from './analysis_unit.dto';
import { AnalysisUnit } from './entity/analysis_unit';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class AnalysisUnitService {
  constructor(
    @InjectRepository(AnalysisUnit)
    private readonly analysisUnitRepository: Repository<AnalysisUnit>,
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

  //Reporte
  //async findByEvidenceType(typeEvidence: number) {
  //return this.analysisUnitRepository.find({ where: { typeEvidence } });
  //}
}
