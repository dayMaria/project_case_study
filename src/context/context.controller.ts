import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ContextService } from './context.service';
import { ContextDto } from './context.dto';

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

  @Get('ids/:ids')
  async findListId(@Param('ids') list: string) {
    return this.contextService.findListId(
      list.split(',').map((x) => parseInt(x)),
    );
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() createdContextDto: ContextDto) {
    return this.contextService.update(Number(id), createdContextDto);
  }
}
