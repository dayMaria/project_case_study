import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { User } from '../entity/user';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(dto: UserDto) {
    await this.repository.save(dto);
  }

  async findAll() {
    return await this.repository.find({});
  }

  async findOne(id: number) {
    const found = await this.repository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return found;
  }

  async update(id: number, dto: UserDto) {
    await this.repository.update({ id }, dto);
  }

  async remove(id: number) {
    await this.repository.delete(id);
  }
}
