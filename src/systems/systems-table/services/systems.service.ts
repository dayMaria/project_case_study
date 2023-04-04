import { Injectable, NotFoundException } from '@nestjs/common';
import { SystemsDto } from '../dto/systems.dto';
import { ObjectUtils } from 'typeorm/util/ObjectUtils';
import { Systems } from '../entity/systems';
import { OrmUtils } from 'typeorm/util/OrmUtils';

@Injectable()
export class SystemsService {
  async create(createSystemsDto: SystemsDto) {
    const systems = new Systems();
    ObjectUtils.assign(systems, createSystemsDto);
    await systems.save();
    return systems;
  }

  async findAll() {
    return await Systems.find();
  }

  async findOne(id: number) {
    const found = await Systems.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Systems with id ${id} not found`);
    }
    return found;
  }

  async update(id: number, createSystemsDto: SystemsDto) {
    const systemsUpdate = await this.findOne(id);
    if (systemsUpdate) {
      OrmUtils.mergeDeep(systemsUpdate, createSystemsDto);
      await Systems.update(id, createSystemsDto);
    }
    return systemsUpdate;
  }

  async remove(id: number) {
    const deleteSystems = await Systems.delete(id);
    if (!deleteSystems.affected) {
      throw new NotFoundException(`Systems with id ${id} not found`);
    }
  }
}
