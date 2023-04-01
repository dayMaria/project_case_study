import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CaseStudyService } from '../services/case_study.service';
import { CaseStudyDto } from '../dto/case_study.dto';

@Controller('case-study')
export class CaseStudyController {
  constructor(private caseStudyService: CaseStudyService) {}

  @Post()
  async create(@Body() createdCaseStudyDto: CaseStudyDto) {
    return this.caseStudyService.create(createdCaseStudyDto);
  }

  @Get()
  async findAll() {
    return this.caseStudyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.caseStudyService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createdCaseStudyDto: CaseStudyDto,
  ) {
    return this.caseStudyService.update(Number(id), createdCaseStudyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.caseStudyService.remove(Number(id));
  }
}
