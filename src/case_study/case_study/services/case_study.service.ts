import { Injectable, NotFoundException } from '@nestjs/common';
import { CaseStudyDto } from '../dto/case_study.dto';
import { CaseStudy } from '../entity/case_study';
import { ObjectUtils } from 'typeorm/util/ObjectUtils';
import { Context } from 'src/context/context/entity/context.entity';
import { In } from 'typeorm';

@Injectable()
export class CaseStudyService {
  async create(createCaseStudyDto: CaseStudyDto) {
    const caseStudy = new CaseStudy();
    caseStudy.create_date = new Date(createCaseStudyDto.create_date);
    caseStudy.commit_date = new Date(createCaseStudyDto.commit_date);
    caseStudy.end_date = new Date(createCaseStudyDto.end_date);
    const contextIds = await Context.find({
      where: { id: In(createCaseStudyDto.contextIds) },
    });
    ObjectUtils.assign(caseStudy, createCaseStudyDto);
    caseStudy.contexts = contextIds;
    await caseStudy.save();
    return caseStudy;
  }

  async findAll() {
    return await CaseStudy.find({ relations: ['contexts'] });
  }

  async findOne(id: number) {
    const found = await CaseStudy.findOne({
      relations: ['contexts'],
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Case study with id ${id} not found`);
    }
    return found;
  }

  async update(id: number, createCaseStudyDto: CaseStudyDto) {
    const caseStudy = await this.findOne(id);
    if (caseStudy) {
      caseStudy.create_date = new Date(createCaseStudyDto.create_date);
      caseStudy.commit_date = new Date(createCaseStudyDto.commit_date);
      caseStudy.end_date = new Date(createCaseStudyDto.end_date);
      const contextIds = await Context.find({
        where: { id: In(createCaseStudyDto.contextIds) },
      });
      caseStudy.description = createCaseStudyDto.description;
      caseStudy.name = createCaseStudyDto.name;
      caseStudy.contexts = contextIds;
      await caseStudy.save();
      return caseStudy;
    }
  }

  async remove(id: number) {
    const deleteCaseStudy = await CaseStudy.delete(id);
    if (!deleteCaseStudy.affected) {
      throw new NotFoundException(`Case study with id ${id} not found`);
    }
  }
}
