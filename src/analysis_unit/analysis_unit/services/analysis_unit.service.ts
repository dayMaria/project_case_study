import { Injectable } from '@nestjs/common';
import { AnalysisUnitDto } from '../dto/analysis_unit.dto';

@Injectable()
export class AnalysisUnitService {
  async create(createAnalysisUnitDto: AnalysisUnitDto) {}

  async findAll() {}

  async findOne(id: number){}

  async update(id: number, createAnalysisUnitDto: AnalysisUnitDto) {}

  async remove(id: number) {}
}
