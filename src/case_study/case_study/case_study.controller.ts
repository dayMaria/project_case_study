import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CaseStudyService } from './case_study.service';
import { CaseStudyDto } from './dto/case_study.dto';
import { AnalysisUnitTypeEvidence } from './entity/analysis_unit_type_evidence';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Member } from './entity/member';
import { ReportService } from './report_service';

@Controller('case-study')
export class CaseStudyController {
  constructor(
    private caseStudyService: CaseStudyService,
    private reportService: ReportService,
  ) {}

  @Post()
  async create(@Body() createdCaseStudyDto: CaseStudyDto) {
    return this.caseStudyService.create(createdCaseStudyDto);
  }

  //@Get()
  //async findAll() {
  //  return this.caseStudyService.findAll();
  //}

  //@Get(':id')
  //async findOne(@Param('id') id: number) {
  //  return this.caseStudyService.findOne(id);
  //}

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createdCaseStudyDto: CaseStudyDto,
  ) {
    return this.caseStudyService.update(Number(id), createdCaseStudyDto);
  }

  @Post('register-evidence')
  @UseInterceptors(FilesInterceptor('files'))
  async registerEvidence(
    @Body('dto') json: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const dto = JSON.parse(json);
    console.log(dto);

    return this.caseStudyService.registerEvidence({
      ...dto,
      files,
    });
  }

  @Post()
  async addTypeEvidence(
    @Body() analysisUnitTypeEvidence: AnalysisUnitTypeEvidence,
  ) {
    return this.caseStudyService.addTypeEvidence(analysisUnitTypeEvidence);
  }
  @Delete()
  async removeTypeEvidence(
    @Body() analysisUnitTypeEvidence: AnalysisUnitTypeEvidence,
  ) {
    return this.caseStudyService.removeTypeEvidence(analysisUnitTypeEvidence);
  }

  @Delete(':id')
  async removeEvidence(@Param('id') id: number) {
    return this.caseStudyService.removeEvidence(id);
  }

  @Post('add-member')
  async addMember(@Body() dto: Member) {
    return this.caseStudyService.addMember(dto);
  }

  @Delete('remove-member')
  async removeMember(@Body() dto: Member) {
    return this.caseStudyService.removeMember(dto);
  }

  @Get()
  async reporte() {
    return this.reportService.ContextAUTypeEvidence();
  }
  //@Post('repo')
  //async reporte(@Param('year1') year1: number, @Param('year2') year2: number) {
  //  return this.reportService.YearByContextByCaseStudy(year1, year2);
  //}
}
