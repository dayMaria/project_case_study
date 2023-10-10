import { Evidence } from '../entity/evidence';

export type RegisterEvidenceDto = Omit<Evidence, 'id' | 'created'> & {
  files: Express.Multer.File[];
};
