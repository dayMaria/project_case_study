import { Injectable } from '@nestjs/common';
import { ContextDto } from '../dto/context.dto';

@Injectable()
export class ContextService {
  async create(createContextDto: ContextDto) {}

  async findAll() {}

  async findOne(id: number) {}

  async update(id: number, createContextDto: ContextDto) {}

  async remove(id: number) {}

}
