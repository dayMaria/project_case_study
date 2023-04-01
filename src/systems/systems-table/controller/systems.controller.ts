import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SystemsService } from '../services/systems.service';
import { SystemsDto } from '../dto/systems.dto';

@Controller('systems')
export class SystemsController {
  constructor(private systemsService: SystemsService) {}

  @Post()
  async create(@Body() createdSystemsDto: SystemsDto) {
    return this.systemsService.create(createdSystemsDto);
  }

  @Get()
  async findAll() {
    return this.systemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.systemsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() createdSystemsDto: SystemsDto) {
    return this.systemsService.update(Number(id), createdSystemsDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.systemsService.remove(Number(id));
  }
}
