import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { User } from './user';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './userLogin.dto';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPw = await bcrypt.hash(dto.password, salt);
    const user = this.repository.create({
      ...dto,
      password: hashedPw,
      active: true,
    });
    await this.repository.save(user);
    return user;
  }

  async findAll() {
    return await this.repository.find({ where: { active: true } });
  }

  async findUser(userLogin: UserLoginDto) {
    const user = await this.repository.findOne({
      where: { username: userLogin.username },
    });
    if (!user) throw new BadRequestException('Credenciales invalidas');

    const matchPw = await bcrypt.compare(userLogin.password, user.password);
    if (!matchPw) throw new BadRequestException('Credenciales invalidas');

    return {
      id: user.id,
      username: user.username,
      rol: user.rol,
    };
  }

  findListId(list: number[]) {
    return this.repository.find({
      where: {
        id: In(list),
      },
    });
  }

  async update(id: number, dto: UserDto) {
    if (await this.repository.find({ where: { id } })) {
      await this.repository.update(id, dto);
    }
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const user = await this.repository.findOne({ where: { id } });
    if (user) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(dto.password, salt);
      await this.repository.update(id, {
        username: dto.username,
        password: hashedPassword,
      });
    }
  }

  async remove(id: number) {
    await this.repository.update({ id }, { active: false });
  }
}
