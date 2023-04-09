import { Injectable, NotFoundException } from '@nestjs/common';
import { SystemsDto } from '../dto/systems.dto';
import { ObjectUtils } from 'typeorm/util/ObjectUtils';
import { Systems } from '../entity/systems';
import { OrmUtils } from 'typeorm/util/OrmUtils';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SystemsService {
  constructor(
    @InjectRepository(Systems)
    private readonly systemsRepository: Repository<Systems>,
  ) {}

  async create(createSystemsDto: SystemsDto) {
    const systems = this.systemsRepository.create(createSystemsDto);
    await this.systemsRepository.save(systems);
    return systems;
  }

  async findAll() {
    return await this.systemsRepository.find();
  }

  async findOne(id: number) {
    const found = await this.systemsRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Systems with id ${id} not found`);
    }
    return found;
  }

  async update(id: number, createSystemsDto: SystemsDto) {
    if (await this.findOne(id)) {
      await this.systemsRepository.update(id, createSystemsDto);
      const systemsUpdate = await this.findOne(id);
      return systemsUpdate;
    }
  }

  async remove(id: number) {
    const deleteSystems = await this.systemsRepository.delete(id);
    if (!deleteSystems.affected) {
      throw new NotFoundException(`Systems with id ${id} not found`);
    }
  }
}
