import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersDto } from '../dto/users.dto';
import { Users } from '../entity/users';
import { ObjectUtils } from 'typeorm/util/ObjectUtils';
import { OrmUtils } from 'typeorm/util/OrmUtils';

@Injectable()
export class UsersService {
  async create(createUsersDto: UsersDto) {
    const user = new Users();
    ObjectUtils.assign(user, createUsersDto);
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
      OrmUtils.mergeDeep(userUpdate, createUsersDto);
      await Users.update(id, createUsersDto);
    }
    return userUpdate;
  }

  async remove(id: number) {
    const deleteUsers = await Users.delete(id);
    if (!deleteUsers.affected) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
