import { Injectable, NotFoundException } from '@nestjs/common';
import { ContextDto } from '../dto/context.dto';
import { Context } from '../entity/context.entity';
import { ObjectUtils } from 'typeorm/util/ObjectUtils';
import { OrmUtils } from 'typeorm/util/OrmUtils';

@Injectable()
export class ContextService {
  async create(createContextDto: ContextDto) {
    const context = new Context();
    ObjectUtils.assign(context, createContextDto);
    await context.save();
    return context;
  }

  async findAll() {
    return await Context.find();
  }

  async findOne(id: number) {
    const found = await Context.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Context with id ${id} not found`);
    }
    return found;
  }

  async update(id: number, createContextDto: ContextDto) {
    const contextUpdate = await this.findOne(id);
    if (contextUpdate) {
      OrmUtils.mergeDeep(contextUpdate, createContextDto);
      await Context.update(id, createContextDto);
    }
    return contextUpdate;
  }

  async remove(id: number) {
    const deleteContext = await Context.delete(id);
    if (!deleteContext.affected) {
      throw new NotFoundException(`Context with id ${id} not found`);
    }
  }
}
