import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { RolesDto } from '../dto/roles.dto';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  async create(@Body() createdRolesDto: RolesDto) {
    return this.rolesService.create(createdRolesDto);
  }

  @Get()
  async findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.rolesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() createdRolesDto: RolesDto) {
    return this.rolesService.update(Number(id), createdRolesDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.rolesService.remove(Number(id));
  }
}
