import { Injectable, NotFoundException } from '@nestjs/common';
import { CaseStudyDto, YearsDto } from '../dto/case_study.dto';
import { CaseStudy } from '../entity/case_study';
import { Repository } from 'typeorm';
import { CaseStudyContextAU } from '../entity/case_study_context_au';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CaseStudyService {
  constructor(
    @InjectRepository(CaseStudy)
    private readonly caseStudyRepository: Repository<CaseStudy>,
    @InjectRepository(CaseStudyContextAU)
    private readonly caseStudyContextAuRepository: Repository<CaseStudyContextAU>,
  ) {}

  async create(createCaseStudyDto: CaseStudyDto) {
    const caseStudy = await this.caseStudyRepository.save({
      name: createCaseStudyDto.name,
      commit_date: createCaseStudyDto.commit_date,
      description: createCaseStudyDto.description,
      end_date: createCaseStudyDto.end_date,
      //create_date: new Date(),
    });
    const contextUas: CaseStudyContextAU[] = [];
    for (const year of createCaseStudyDto.years) {
      for (const ctx of year.contexts) {
        for (const au of ctx.aus) {
          contextUas.push({
            caseStudy: caseStudy.id,
            year: year.year,
            context: ctx.id,
            analysisUnit: au,
          });
        }
      }
    }
    await this.caseStudyContextAuRepository.save(contextUas);
    return caseStudy;
  }

  async findAll() {
    return await this.caseStudyRepository.find();
  }

  async findOne(id: number) {
    const caseStudy = await this.caseStudyRepository.findOne({
      where: { id },
    });
    if (!caseStudy) {
      throw new NotFoundException(`Case study with id ${id} not found`);
    }
    const yearsDto: YearsDto[] = [];
    const contextsAus = await this.caseStudyContextAuRepository.find({
      where: { caseStudy: id },
    });
    const years = new Set();
    years.forEach((year: number) => {
      //console.log(year);
      const yearDto: YearsDto = {
        year,
        contexts: [],
      };
      contextsAus
        .filter((c) => c.year === year)
        .forEach((ctxAus) => {
          const aus = contextsAus
            .filter((c) => c.year === year && c.context === ctxAus.context)
            .map((c) => c.analysisUnit);
          if (!yearDto.contexts.some((c) => c.id === ctxAus.context)) {
            yearDto.contexts.push({
              id: ctxAus.context,
              aus,
            });
          }
          //console.log(yearsDto);
        });
      yearsDto.push(yearDto);
    });
    return {
      id: caseStudy.id,
      name: caseStudy.name,
      description: caseStudy.description,
      commit_date: caseStudy.commit_date,
      end_date: caseStudy.end_date,
      years: yearsDto,
    };
  } /**/

  async update(id: number, createCaseStudyDto: CaseStudyDto) {
    if (await this.caseStudyRepository.findOne({ where: { id } })) {
      await this.caseStudyRepository.update(
        { id },
        {
          name: createCaseStudyDto.name,
          commit_date: createCaseStudyDto.commit_date,
          description: createCaseStudyDto.description,
          end_date: createCaseStudyDto.end_date,
        },
      );
      await this.caseStudyContextAuRepository.delete({
        caseStudy: id,
      });
      const contextUas: CaseStudyContextAU[] = [];
      for (const year of createCaseStudyDto.years) {
        for (const ctx of year.contexts) {
          for (const au of ctx.aus) {
            contextUas.push({
              caseStudy: id,
              year: year.year,
              context: ctx.id,
              analysisUnit: au,
            });
          }
        }
      }
      await this.caseStudyContextAuRepository.save(contextUas);
      return this.findOne(id);
    }
    throw new NotFoundException(`Case study with id ${id} not found`);
  }

  async remove(id: number) {
    const deleteCaseStudy = await this.caseStudyRepository.delete(id);
    if (!deleteCaseStudy.affected) {
      throw new NotFoundException(`Case study with id ${id} not found`);
    }
  }
}
