import { Injectable, NotFoundException } from '@nestjs/common';
import { ContextDto } from '../dto/context.dto';
import { Context } from '../entity/context.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CaseStudyContextAU } from 'src/case_study/case_study/entity/case_study_context_au';

@Injectable()
export class ContextService {
  constructor(
    @InjectRepository(Context)
    private readonly contextRepository: Repository<Context>,
    @InjectRepository(CaseStudyContextAU)
    private readonly caseStudyContextRepository: Repository<CaseStudyContextAU>,
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
    if (
      await this.caseStudyContextRepository.findOne({
        where: { analysisUnit: id },
      })
    ) {
      throw new NotFoundException(
        `Can't delete analysis unit because it's assigned to a context`,
      );
    }
    const deleteContext = await this.contextRepository.delete(id);
    if (!deleteContext.affected) {
      throw new NotFoundException(`Context with id ${id} not found`);
    }
  }
}
