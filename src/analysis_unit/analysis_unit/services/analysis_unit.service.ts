import { Injectable, NotFoundException } from '@nestjs/common';
import { AnalysisUnitDto } from '../dto/analysis_unit.dto';
import { AnalysisUnit } from '../entity/analysis_unit';
import { ObjectUtils } from 'typeorm/util/ObjectUtils';
import { Systems } from 'src/systems/systems-table/entity/systems';
import { In } from 'typeorm';

@Injectable()
export class AnalysisUnitService {
  async create(createAnalysisUnitDto: AnalysisUnitDto) {
    const analysisUnit = new AnalysisUnit();
    const systems = await Systems.find({
      where: { id: In(createAnalysisUnitDto.systemsIds) },
    });
    ObjectUtils.assign(analysisUnit, createAnalysisUnitDto);
    analysisUnit.systems = systems;
    await analysisUnit.save();
    return analysisUnit;
  }

  async findAll() {
    return await AnalysisUnit.find({ relations: ['systems'] });
  }

  async findOne(id: number) {
    const found = await AnalysisUnit.findOne({
      relations: ['systems'],
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Analysis unit with id ${id} not found`);
    }
    return found;
  }

  async update(id: number, createAnalysisUnitDto: AnalysisUnitDto) {
    const analysisUnit = await this.findOne(id);
    if (analysisUnit) {
      const systems = await Systems.find({
        where: { id: In(createAnalysisUnitDto.systemsIds) },
      });
      analysisUnit.name = createAnalysisUnitDto.name;
      analysisUnit.description = createAnalysisUnitDto.description;
      analysisUnit.systems = systems;
      analysisUnit.save();
      return analysisUnit;
    }
  }

  async remove(id: number) {
    const deleteAnalysisUnit = await AnalysisUnit.delete(id);
    if (!deleteAnalysisUnit.affected) {
      throw new NotFoundException(`Analysis unit with id ${id} not found`);
    }
  }
}
