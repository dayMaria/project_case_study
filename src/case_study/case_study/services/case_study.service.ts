import { Injectable, NotFoundException } from '@nestjs/common';
import { CaseStudyDto } from '../dto/case_study.dto';
import { CaseStudy } from '../entity/case_study';
import { ObjectUtils } from 'typeorm/util/ObjectUtils';
import { OrmUtils } from 'typeorm/util/OrmUtils';

@Injectable()
export class CaseStudyService {
  async create(createCaseStudyDto: CaseStudyDto) {
    const caseStudy = new CaseStudy();
    let date = new Date(createCaseStudyDto.create_date);
    caseStudy.create_date = date;
    date = new Date(createCaseStudyDto.commit_date);
    caseStudy.create_date = date;
    date = new Date(createCaseStudyDto.end_date);
    caseStudy.create_date = date;
    ObjectUtils.assign(caseStudy, createCaseStudyDto);
    await caseStudy.save();
    return caseStudy;
  }

  async findAll() {
    return await CaseStudy.find();
  }

  async findOne(id: number) {
    const found = await CaseStudy.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Case study with id ${id} not found`);
    }
    return found;
  }

  async update(id: number, createCaseStudyDto: CaseStudyDto) {
    const caseStudy = await this.findOne(id);
    if (caseStudy) {
      let date = new Date(createCaseStudyDto.create_date);
      caseStudy.create_date = date;
      date = new Date(createCaseStudyDto.commit_date);
      caseStudy.create_date = date;
      date = new Date(createCaseStudyDto.end_date);
      caseStudy.create_date = date;
      OrmUtils.mergeDeep(caseStudy, createCaseStudyDto);
      await CaseStudy.update(id, createCaseStudyDto);
    }
    return caseStudy;
  }

  async remove(id: number) {
    const deleteCaseStudy = await CaseStudy.delete(id);
    if (!deleteCaseStudy.affected) {
      throw new NotFoundException(`Case study with id ${id} not found`);
    }
  }
}
