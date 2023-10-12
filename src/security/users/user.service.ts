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
    const user = this.repository.create(dto);
    await this.repository.save(dto);
    return user;
  }

  async findAll() {
    return await this.repository.find({ where: { active: true } });
  }

  async update(id: number, dto: UserDto) {
    if (await this.repository.findOne({ where: { id } })) {
      await this.repository.update(id, dto);
      return await this.repository.find({ where: { id } });
    }
  }

  async remove(id: number) {
    await this.repository.update({ id }, { active: false });
  }
}
