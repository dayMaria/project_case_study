import { Injectable, NotFoundException } from '@nestjs/common';
import { ContextDto } from '../dto/context.dto';
import { Context } from '../entity/context.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContextService {
  constructor(
    @InjectRepository(Context)
    private readonly contextRepository: Repository<Context>,
  ) {}
  async create(createContextDto: ContextDto) {
    const context = this.contextRepository.create(createContextDto);
    await this.contextRepository.save(context);
    return context;
  }

  async findAll() {
    return await this.contextRepository.find();
  }

  async findOne(id: number) {
    const found = await this.contextRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Context with id ${id} not found`);
    }
    return found;
  }

  async update(id: number, createContextDto: ContextDto) {
    if (await this.findOne(id)) {
      await this.contextRepository.update(id, createContextDto);
      const contextUpdate = await this.findOne(id);
      return contextUpdate;
    }
  }

  async remove(id: number) {
    const deleteContext = await this.contextRepository.delete(id);
    if (!deleteContext.affected) {
      throw new NotFoundException(`Context with id ${id} not found`);
    }
  }
}
