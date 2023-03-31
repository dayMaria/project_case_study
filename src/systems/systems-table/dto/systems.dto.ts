import { IsString, IsUrl } from 'class-validator';

export class SystemsDto {
  @IsUrl()
  url: string;

  @IsString()
  description: string;
}
