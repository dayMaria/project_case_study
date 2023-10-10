import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeEvidence } from './typeEvidence.entity';
import { Repository } from 'typeorm';
import { TypeEvidenceDto } from './typeEvidence.dto';

@Injectable()
export class TypeEvidenceService {
  constructor(
    @InjectRepository(TypeEvidence)
    private readonly typeEvidenceRepository: Repository<TypeEvidence>,
  ) {}

  async create(createTypeEvidenceDto: TypeEvidenceDto) {
    const typeEvidence = this.typeEvidenceRepository.create(
      createTypeEvidenceDto,
    );
    await this.typeEvidenceRepository.save(typeEvidence);
    return typeEvidence;
  }

  async findAll() {
    return await this.typeEvidenceRepository.find();
  }

  async findOne(id: number) {
    const found = await this.typeEvidenceRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Type evidence with id ${id} not found`);
    }
    return found;
  }

  async update(id: number, createTypeEvidenceDto: TypeEvidenceDto) {
    if (await this.findOne(id)) {
      await this.typeEvidenceRepository.update(id, createTypeEvidenceDto);
    }
  }
}
