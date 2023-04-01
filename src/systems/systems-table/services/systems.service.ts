import { Injectable } from '@nestjs/common';
import { SystemsDto } from '../dto/systems.dto';

@Injectable()
export class SystemsService {
  async create(createSystemsDto: SystemsDto) {}

  async findAll() {}

  async findOne(id: number){}

  async update(id: number, createSystemsDto: SystemsDto) {}

  async remove(id: number) {}

}
