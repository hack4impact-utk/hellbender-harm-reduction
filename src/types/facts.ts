import { z } from 'zod';
import zBase from './base';

export const zFactsBase = z.object({
  fact: z.string(),
});

// Extend to create request, response, and entity types with zBase for event
export const zFactsEntity = zFactsBase.extend({ ...zBase.shape });
export const zCreateFactsRequest = zFactsBase;
export const zFactsResponse = zFactsEntity;
export const zUpdateFactsRequest = zCreateFactsRequest.partial();

export interface FactsEntity extends z.infer<typeof zFactsEntity> {}

export type CreateFactsRequest = z.infer<typeof zCreateFactsRequest>;

export type FactsResponse = z.infer<typeof zFactsResponse>;

export type UpdateFactsRequest = z.infer<typeof zUpdateFactsRequest>;
