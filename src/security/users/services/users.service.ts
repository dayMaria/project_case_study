import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersDto } from '../dto/users.dto';
import { Users } from '../entity/users';
import { ObjectUtils } from 'typeorm/util/ObjectUtils';
import { Roles } from 'src/security/roles/entity/roles';
import { In } from 'typeorm';
@Injectable()
export class UsersService {
  async create(createUsersDto: UsersDto) {
    const user = new Users();
    const rolesIds = await Roles.find({
      where: { id: In(createUsersDto.rolesIds) },
    });
    ObjectUtils.assign(user, createUsersDto);
    user.roles = rolesIds;
    await user.save();
    return user;
  }

  async findAll() {
    return await Users.find({ relations: ['roles'] });
  }

  async findOne(id: number) {
    const found = await Users.findOne({ relations: ['roles'], where: { id } });
    if (!found) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return found;
  }

  async update(id: number, createUsersDto: UsersDto) {
    const userUpdate = await this.findOne(id);
    if (userUpdate) {
      const roles = await Roles.find({
        where: { id: In(createUsersDto.rolesIds) },
      });
      userUpdate.user_name = createUsersDto.user_name;
      userUpdate.password = createUsersDto.password;
      userUpdate.active = createUsersDto.active;
      userUpdate.name = createUsersDto.name;
      userUpdate.email = createUsersDto.email;
      userUpdate.roles = roles;
      await userUpdate.save();
      return userUpdate;
    }
  }

  async remove(id: number) {
    const deleteUsers = await Users.delete(id);
    if (!deleteUsers.affected) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
