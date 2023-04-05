import { Injectable, NotFoundException } from '@nestjs/common';
import { ContextDto } from '../dto/context.dto';
import { Context } from '../entity/context.entity';
import { ObjectUtils } from 'typeorm/util/ObjectUtils';
import { AnalysisUnit } from 'src/analysis_unit/analysis_unit/entity/analysis_unit';
import { In } from 'typeorm';
import { Systems } from 'src/systems/systems-table/entity/systems';

@Injectable()
export class ContextService {
  async create(createContextDto: ContextDto) {
    const context = new Context();
    const analysisUnitIds = await AnalysisUnit.find({
      where: { id: In(createContextDto.analysisUnitIds) },
    });
    const systems = await Systems.find({
      where: { id: In(createContextDto.systemsIds) },
    });
    ObjectUtils.assign(context, createContextDto);
    context.analysisUnits = analysisUnitIds;
    context.systems = systems;
    await context.save();
    return context;
  }

  async findAll() {
    return await Context.find({ relations: ['analysisUnits', 'systems'] });
  }

  async findOne(id: number) {
    const found = await Context.findOne({
      relations: ['analysisUnits', 'systems'],
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Context with id ${id} not found`);
    }
    return found;
  }

  async update(id: number, createContextDto: ContextDto) {
    const contextUpdate = await this.findOne(id);
    if (contextUpdate) {
      const analysisUnitIds = await AnalysisUnit.find({
        where: { id: In(createContextDto.analysisUnitIds) },
      });
      const systems = await Systems.find({
        where: { id: In(createContextDto.systemsIds) },
      });
      contextUpdate.name = createContextDto.name;
      contextUpdate.description = createContextDto.description;
      contextUpdate.analysisUnits = analysisUnitIds;
      contextUpdate.systems = systems;
      await contextUpdate.save();
      return contextUpdate;
    }
  }

  async remove(id: number) {
    const deleteContext = await Context.delete(id);
    if (!deleteContext.affected) {
      throw new NotFoundException(`Context with id ${id} not found`);
    }
  }
}
