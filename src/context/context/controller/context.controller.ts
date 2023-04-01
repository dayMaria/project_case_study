import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ContextService } from '../services/context.service';
import { ContextDto } from '../dto/context.dto';

@Controller('context')
export class ContextController {
  constructor(private contextService: ContextService) {}

  @Post()
  async create(@Body() createdContextDto: ContextDto) {
    return this.contextService.create(createdContextDto);
  }

  @Get()
  async findAll() {
    return this.contextService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.contextService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() createdContextDto: ContextDto) {
    return this.contextService.update(Number(id), createdContextDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.contextService.remove(Number(id));
  }
}
