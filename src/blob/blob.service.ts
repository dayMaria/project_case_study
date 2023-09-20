import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'minio';
import { InjectMinio } from 'nestjs-minio';

@Injectable()
export class BlobService {
  private bucket: string;

  constructor(
    config: ConfigService,
    @InjectMinio() private readonly client: Client,
  ) {
    this.bucket = config.get<string>('MINIO_BUCKET');
  }

  download(path: string) {
    return this.client.presignedGetObject(this.bucket, path);
  }

  async upload(path: string, data: Buffer) {
    await this.client.putObject(this.bucket, path, data);
  }
}
