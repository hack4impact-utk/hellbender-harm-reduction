import { z } from 'zod';
import zBase from './base';

export const zCertBase = z.object({
  certName: z.string(),
  certPicture: z.string().optional(),
  certDescription: z.string(),
});

// Extend to create request, response, and entity types with zBase for event
export const zCertEntity = zCertBase.extend({ ...zBase.shape });
export const zCreateCertRequest = zCertBase;
export const zCertResponse = zCertEntity;
export const zUpdateCertRequest = zCreateCertRequest.partial();

export interface CertEntity extends z.infer<typeof zCertEntity> {}

export type CreateCertRequest = z.infer<typeof zCreateCertRequest>;

export type CertResponse = z.infer<typeof zCertResponse>;

export type UpdateCertRequest = z.infer<typeof zUpdateCertRequest>;
