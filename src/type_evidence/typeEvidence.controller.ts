import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TypeEvidenceService } from './typeEvidence.service';
import { TypeEvidenceDto } from './typeEvidence.dto';

@Controller('typeEvidence')
export class TypeEvidenceController {
  constructor(private typeEvidenceService: TypeEvidenceService) {}

  @Post()
  async create(@Body() createdTypeEvidenceDto: TypeEvidenceDto) {
    return this.typeEvidenceService.create(createdTypeEvidenceDto);
  }

  @Get()
  async findAll() {
    return this.typeEvidenceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.typeEvidenceService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createdTypeEvidenceDto: TypeEvidenceDto,
  ) {
    return this.typeEvidenceService.update(Number(id), createdTypeEvidenceDto);
  }
}
