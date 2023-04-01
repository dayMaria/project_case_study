import { Injectable } from '@nestjs/common';
import { CaseStudyDto } from '../dto/case_study.dto';

@Injectable()
export class CaseStudyService {
  async create(createCaseStudyDto: CaseStudyDto) {}

  async findAll(){}

  async findOne(id: number){}

  async update(id: number, createCaseStudyDto: CaseStudyDto){}

  async remove(id: number){}

}
