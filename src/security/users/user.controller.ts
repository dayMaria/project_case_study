import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  async create(@Body() dto: UserDto) {
    return this.service.create(dto);
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UserDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
