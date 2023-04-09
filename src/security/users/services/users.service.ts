import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersDto } from '../dto/users.dto';
import { Users } from '../entity/users';
import { Roles } from 'src/security/roles/entity/roles';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  async create(createUsersDto: UsersDto) {
    const rolesIds = await this.rolesRepository.find({
      where: { id: In(createUsersDto.rolesIds) },
    });
    const user = this.usersRepository.create(createUsersDto);
    user.roles = rolesIds;
    await this.usersRepository.save(user);
    return user;
  }

  async findAll() {
    return await this.usersRepository.find({ relations: ['roles'] });
  }

  async findOne(id: number) {
    const found = await this.usersRepository.findOne({
      relations: ['roles'],
      where: { id },
    });
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
  //!!!!!!!!!!Verificar xq Repinga no funciona la funcion esta!!!!!!!!!
  // async update(id: number, createUsersDto: UsersDto) {
  //   const userUpdate = await this.findOne(id);
  //   if (userUpdate) {
  //     const roles = await this.rolesRepository.find({
  //       where: { id: In(createUsersDto.rolesIds) },
  //     });
  //     userUpdate.roles = roles;
  //     await this.usersRepository.update(id, userUpdate);
  //     return userUpdate;
  //   }
  // }

  async remove(id: number) {
    const deleteUsers = await this.usersRepository.delete(id);
    if (!deleteUsers.affected) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
