import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { User } from './user';
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
    return await this.repository.find({ where: { active: true } });
  }

  async update(id: number, dto: UserDto) {
    await this.repository.update({ id }, dto);
  }

  async remove(id: number) {
    await this.repository.update({ id }, { active: false });
  }
}
