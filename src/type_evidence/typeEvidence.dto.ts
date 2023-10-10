import { IsNotEmpty, IsString } from 'class-validator';

export class TypeEvidenceDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
