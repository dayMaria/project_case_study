import { Injectable, NotFoundException } from '@nestjs/common';
import { RolesDto } from '../dto/roles.dto';
import { Roles } from '../entity/roles';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}
  async create(createdRolesDto: RolesDto) {
    const roles = this.rolesRepository.create(createdRolesDto);
    await this.rolesRepository.save(createdRolesDto);
    return roles;
  }

  async findAll() {
    return await this.rolesRepository.find();
  }

  async findOne(id: number) {
    const found = await this.rolesRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Rol with id ${id} not found`);
    }
    return found;
  }

  async update(id: number, createdRolesDto: RolesDto) {
    if (await this.findOne(id)) {
      await this.rolesRepository.update(id, createdRolesDto);
      const rolesUpdate = await this.findOne(id);
      return rolesUpdate;
    }
  }

  async remove(id: number) {
    const deleteRoles = await this.rolesRepository.delete(id);
    if (!deleteRoles.affected) {
      throw new NotFoundException(`Rol with id ${id} not found`);
    }
  }
}
