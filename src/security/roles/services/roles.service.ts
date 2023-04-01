import { Injectable } from '@nestjs/common';
import { RolesDto } from '../dto/roles.dto';

@Injectable()
export class RolesService {
  async create(createdRolesDto: RolesDto) {}

  async findAll() {}

  async findOne(id: number){}

  async update(id: number, createdRolesDto: RolesDto) {}

  async remove(id: number) {}
}
