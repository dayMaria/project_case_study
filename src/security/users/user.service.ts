import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { User } from './user';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(dto: UserDto) {
    const user = this.repository.create({ ...dto, active: true });
    await this.repository.save(user);
    return user;
  }

  async findAll() {
    return await this.repository.find({ where: { active: true } });
  }

  findListId(list: number[]) {
    return this.repository.find({
      where: {
        id: In(list),
      },
    });
  }

  async update(id: number, dto: UserDto) {
    if (await this.repository.findOne({ where: { id } })) {
      await this.repository.update(id, dto);
    }
  }

  async remove(id: number) {
    await this.repository.update({ id }, { active: false });
  }
}
