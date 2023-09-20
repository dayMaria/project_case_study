import { IsNotEmpty, IsString } from 'class-validator';

export class EvidenceDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
