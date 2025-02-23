import { z } from 'zod';
import zBase from './base';
import { zCertEntity } from './certification';

export const eventTypeEnum = [
  'Harm Reduction Services',
  'Syringe Pick-Up',
  'Community Education and Advocacy',
  'In-Kind Fundraising',
  'Building Work Days',
  'Fundraising',
  'Special Events',
] as const;
export const zEventTypeEnum = z.enum(eventTypeEnum);
export type EventTypeEnum = z.infer<typeof zEventTypeEnum>;

export const zEventBase = z.object({
  eventName: z.string(),
  eventStart: z.date(),
  eventEnd: z.date(),
  eventDescription: z.string(),
  eventType: zEventTypeEnum,
  eventRequirements: z.array(zCertEntity).optional(),
});

// Extend to create request, response, and entity types with zBase for event
export const zEventEntity = zEventBase.extend({ ...zBase.shape });
export const zCreateEventRequest = zEventBase;
export const zEventResponse = zEventEntity;
export const zUpdateEventRequest = zCreateEventRequest.partial();

export interface EventEntity extends z.infer<typeof zEventEntity> {}

//export interface CreateEventRequest extends z.infer<typeof zCreateEventRequest> {}
export type CreateEventRequest = z.infer<typeof zCreateEventRequest>;

//export interface EventResponse extends z.infer<typeof zEventResponse> {}
export type EventResponse = z.infer<typeof zEventResponse>;

//export interface UpdateEventRequest extends z.infer<typeof zUpdateEventRequest> {}
export type UpdateEventRequest = z.infer<typeof zUpdateEventRequest>;
