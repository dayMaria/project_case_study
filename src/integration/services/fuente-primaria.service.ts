import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fetch from 'node-fetch';

@Injectable()
export class FuentePrimariaService {
  private readonly url: string;

  constructor(config: ConfigService) {
    this.url = config.get('FUENTE_PRIMARIA_URL');
  }

  async getEntities() {
    const res = await fetch(this.url + 'entidades');
    const json = await res.json();
    return json;
  }

  async getLaboratories(entidad: number) {
    const res = await fetch(this.url + 'laboratories?entidad=' + entidad);
    const json = await res.json();
    return json;
  }
}
