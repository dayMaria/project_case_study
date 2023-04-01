import { Injectable } from '@nestjs/common';
import { UsersDto } from '../dto/users.dto';

@Injectable()
export class UsersService {
  async create(createUsersDto: UsersDto) {}

  async findAll() {}

  async findOne(id: number){}

  async update(id: number, createUsersDto: UsersDto) {}

  async remove(id: number) {}
}
