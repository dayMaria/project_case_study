import { Injectable, NotFoundException } from '@nestjs/common';
import { RolesDto } from '../dto/roles.dto';
import { Roles } from '../entity/roles';
import { ObjectUtils } from 'typeorm/util/ObjectUtils';
import { OrmUtils } from 'typeorm/util/OrmUtils';

@Injectable()
export class RolesService {
  async create(createdRolesDto: RolesDto) {
    const roles = new Roles();
    ObjectUtils.assign(roles, createdRolesDto);
    await roles.save();
    return roles;
  }

  async findAll() {
    return await Roles.find({ relations: ['users'] });
  }

  async findOne(id: number) {
    const found = await Roles.findOne({ relations: ['users'], where: { id } });
    if (!found) {
      throw new NotFoundException(`Rol with id ${id} not found`);
    }
    return found;
  }

  async update(id: number, createdRolesDto: RolesDto) {
    const rolesUpdate = await this.findOne(id);
    if (rolesUpdate) {
      OrmUtils.mergeDeep(rolesUpdate, createdRolesDto);
      await Roles.update(id, createdRolesDto);
    }
    return rolesUpdate;
  }

  async remove(id: number) {
    const deleteRoles = await Roles.delete(id);
    if (!deleteRoles.affected) {
      throw new NotFoundException(`Rol with id ${id} not found`);
    }
  }
}
