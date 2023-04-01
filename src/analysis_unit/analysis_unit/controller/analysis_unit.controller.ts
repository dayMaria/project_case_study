import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AnalysisUnitService } from '../services/analysis_unit.service';
import { AnalysisUnitDto } from '../dto/analysis_unit.dto';

@Controller('analysis-unit')
export class AnalysisUnitController {
  constructor(private analysisUnitService: AnalysisUnitService) {}

  @Post()
  async create(@Body() createdAnalysisUnitDto: AnalysisUnitDto) {
    return this.analysisUnitService.create(createdAnalysisUnitDto);
  }

  @Get()
  async findAll() {
    return this.analysisUnitService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.analysisUnitService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createdAnalysisUnitDto: AnalysisUnitDto,
  ) {
    return this.analysisUnitService.update(Number(id), createdAnalysisUnitDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.analysisUnitService.remove(Number(id));
  }
}
