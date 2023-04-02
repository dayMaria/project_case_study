import { Injectable, NotFoundException } from '@nestjs/common';
import { AnalysisUnitDto } from '../dto/analysis_unit.dto';
import { AnalysisUnit } from '../entity/analysis_unit';
import { ObjectUtils } from 'typeorm/util/ObjectUtils';
import { OrmUtils } from 'typeorm/util/OrmUtils';

@Injectable()
export class AnalysisUnitService {
  async create(createAnalysisUnitDto: AnalysisUnitDto) {
    const analysisUnit = new AnalysisUnit();
    ObjectUtils.assign(analysisUnit, createAnalysisUnitDto);
    await analysisUnit.save();
    return analysisUnit;
  }

  async findAll() {
    return await AnalysisUnit.find();
  }

  async findOne(id: number) {
    const found = await AnalysisUnit.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Analysis unit with id ${id} not found`);
    }
    return found;
  }

  async update(id: number, createAnalysisUnitDto: AnalysisUnitDto) {
    const analysisUnit = await this.findOne(id);
    if (analysisUnit) {
      OrmUtils.mergeDeep(analysisUnit, createAnalysisUnitDto);
      await AnalysisUnit.update(id, createAnalysisUnitDto);
    }
    return analysisUnit;
  }

  async remove(id: number) {
    const deleteAnalysisUnit = await AnalysisUnit.delete(id);
    if (!deleteAnalysisUnit.affected) {
      throw new NotFoundException(`Analysis unit with id ${id} not found`);
    }
  }
}
