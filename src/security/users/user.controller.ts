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
import { UserLoginDto } from './userLogin.dto';
import { CreateUserDto } from './create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get('ids/:ids')
  async findListId(@Param('ids') list: string) {
    return this.service.findListId(list.split(',').map((x) => parseInt(x)));
  }

  @Post('userLogin')
  async findUser(@Body() userLogin: UserLoginDto) {
    return this.service.findUser(userLogin);
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
