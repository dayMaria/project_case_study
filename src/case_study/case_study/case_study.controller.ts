import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CaseStudyService } from './case_study.service';
import { CaseStudyDto } from './dto/case_study.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ReportService } from './report_service';
import { MemberDto } from './dto/member.dto';
import { AnalysisUnitTypeEvidenceDto } from './dto/analysis_unit_type_evidence.dto';

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
  async findAll(@Query('user') user: number) {
    return this.caseStudyService.findAll(user);
  }

  @Get('all')
  async findAllCasesStudies() {
    return this.caseStudyService.findAllCasesStudies();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.caseStudyService.findOne(id);
  }

  @Get('ids/:ids')
  async findListId(@Param('ids') list: string) {
    return this.caseStudyService.findListId(
      list.split(',').map((x) => parseInt(x)),
    );
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

  @Get('misEvidencias/:id')
  async misEvidencias(@Param('id') id: number) {
    return this.caseStudyService.misEvidencias(id);
  }

  @Post('addTypeEvidence')
  async addAnalysisUnitTypeEvidence(
    @Body() analysisUnitTypeEvidence: AnalysisUnitTypeEvidenceDto,
  ) {
    return this.caseStudyService.addTypeEvidence(analysisUnitTypeEvidence);
  }
  @Delete('/remove-typeEvidence/:id')
  async removeTypeEvidence(@Param('id') id: number) {
    return this.caseStudyService.removeTypeEvidence(id);
  }

  @Delete('/remove-evidence/:id')
  async removeEvidence(@Param('id') id: number) {
    return this.caseStudyService.removeEvidence(id);
  }

  @Post('add-member')
  async addMember(@Body() dto: MemberDto) {
    return this.caseStudyService.addMember(dto);
  }

  @Delete('/remove-member/:id')
  async removeMember(@Param('id') id: number) {
    return this.caseStudyService.removeMember(id);
  }

  @Get('/repo/reporte2')
  async reporteGetContextAndAnalysisUnitAndTypeEvidence() {
    return this.reportService.getContextAndAnalysisUnitAndTypeEvidence();
  }

  @Get('/members/:id')
  async getCaseStudyForMembers(@Param('id') id: number) {
    return this.reportService.findCasesStudiesForMembers(id);
  }
  @Get('/reporte3/:startYear/:endYear')
  async reporteGetContextAndStudyByDateRange(
    @Param('startYear') startYear: number,
    @Param('endYear') endYear: number,
  ) {
    return this.reportService.getContextAndCaseStudyByDateRange(
      startYear,
      endYear,
    );
  }

  @Get('/reporte1/:idTypeEvidence')
  async reporteGetAnalysisUnitAndCaseStudyByTypeEvidence(
    @Param('idTypeEvidence') idTypeEvidence: number,
  ) {
    return this.reportService.getAnalysisUnitAndCaseStudyByTypeEvidence(
      idTypeEvidence,
    );
  }

  @Get('/reporte5/:idTypeEvidence')
  async reporteGetCaseStudyBytypeEvidence(
    @Param('idTypeEvidence') idTypeEvidence: number,
  ) {
    return this.reportService.getCaseStudyBytypeEvidence(idTypeEvidence);
  }
  @Get('/reporte4/:id')
  async reporteGetAnalysisUnitByContextByCaseStudy(@Param('id') id: number) {
    return this.reportService.getAnalysisUnitAndCaseStudyByContext(id);
  }

  @Get('/tableEvidence/:idCaseStudy/:idContext/:idAnalysisUnit')
  async getTableEvidence(
    @Param('idCaseStudy') idCaseStudy: number,
    @Param('idContext') idContext: number,
    @Param('idAnalysisUnit') idAnalysisUnit: number,
  ) {
    return this.reportService.getCaseStudyAndContextAndAnalysisUnitAndEvidence(
      idCaseStudy,
      idContext,
      idAnalysisUnit,
    );
  }
}
