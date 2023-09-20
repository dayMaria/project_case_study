import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EvidenceService } from './evidence.service';
import { EvidenceDto } from './dto/evidence.dto';

@Controller('evidence')
export class EvidenceController {
  constructor(private evidenceService: EvidenceService) {}

  @Post()
  create(@Body() createdEvidenceDto: EvidenceDto) {
    return this.evidenceService.create(createdEvidenceDto);
  }

  @Post(':id/attach')
  @UseInterceptors(FileInterceptor)
  attach(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile('file') file: Express.Multer.File,
    @Body('name') name: string,
  ) {
    return this.evidenceService.attachFile(name, file.buffer, id);
  }

  @Get()
  async findAll() {
    return this.evidenceService.findAll();
  }

  @Get(':id')
  async update(
    @Param('id') id: string,
    @Body() createdEvidenceDto: EvidenceDto,
  ) {
    return this.evidenceService.update(Number(id), createdEvidenceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.evidenceService.remove(Number(id));
  }
}
