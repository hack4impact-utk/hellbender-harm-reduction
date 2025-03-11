import { z } from 'zod';
import zBase from './base';

export const zTagBase = z.object({
  tagName: z.string(),
  tagDescription: z.string(),
  certification: z.boolean(),
});

// Extend to create request, response, and entity types with zBase for event
export const zTagEntity = zTagBase.extend({ ...zBase.shape });
export const zCreateTagRequest = zTagBase;
export const zTagResponse = zTagEntity;
export const zUpdateTagRequest = zCreateTagRequest.partial();

export interface TagEntity extends z.infer<typeof zTagEntity> {}

export type CreateTagRequest = z.infer<typeof zCreateTagRequest>;

export type TagResponse = z.infer<typeof zTagResponse>;

export type UpdateTagRequest = z.infer<typeof zUpdateTagRequest>;
