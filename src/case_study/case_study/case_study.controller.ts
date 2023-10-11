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

  @Post('addTypeEvidence')
  async addTypeEvidence(
    @Body() analysisUnitTypeEvidence: AnalysisUnitTypeEvidence,
  ) {
    return this.caseStudyService.addTypeEvidence(analysisUnitTypeEvidence);
  }
  @Delete('remove-typeEvidence')
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

  //@Get()
  //async reporte() {
  //  return this.reportService.getContextAndAnalysisUnitAndTypeEvidence();
  //}
  //
  //@Get(':startYear/:endYear')
  //async reporte(
  //  @Param('startYear') startYear: number,
  //  @Param('endYear') endYear: number,
  //) {
  //  return this.reportService.getContextAndCaseStudyByDateRange(
  //    startYear,
  //    endYear,
  //  );
  //}
  //
  //
  //@Get(':idTypeEvidence')
  //async reporte(@Param('idTypeEvidence') idTypeEvidence: number) {
  //  return this.reportService.getAnalysisUnitAndCaseStudyByTypeEvidence(
  //    idTypeEvidence,
  //  );
  //}
  //
  //@Get(':idTypeEvidence')
  //async reporte(@Param('idTypeEvidence') idTypeEvidence: number) {
  //  return this.reportService.getCaseStudyBytypeEvidence(idTypeEvidence);
  //}
  //@Get(':id')
  //async reporte(@Param('id') id: number) {
  //  return this.reportService.AnalysisUnitByContextByCaseStudy(id);
  //}
}
