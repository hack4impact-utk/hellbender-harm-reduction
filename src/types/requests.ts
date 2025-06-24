import { z } from 'zod';
import zBase from './base';

export const statusEnum = ['requested', 'in progress', 'N/A'] as const;
export const zStatusEnum = z.enum(statusEnum);

export const zRequestsBase = z.object({
  title: z.string(),
  certification: z.boolean(),
  status: zStatusEnum,
  timesRequested: z.number(),
  requestingUser: z.string().optional(),
});

export const zRequestsEntity = zRequestsBase.extend({ ...zBase.shape });
export const zRequestsRequest = zRequestsBase;
export const zRequestsResponse = zRequestsEntity;
export const zUpdateRequestsRequest = zRequestsRequest.partial();
export interface RequestsEntity extends z.infer<typeof zRequestsEntity> {}
export type RequestsRequest = z.infer<typeof zRequestsRequest>;
export type RequestsResponse = z.infer<typeof zRequestsResponse>;
export type UpdateRequestsRequest = z.infer<typeof zUpdateRequestsRequest>;
