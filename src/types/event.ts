import { z } from 'zod';
import zBase from './base'; 

const eventTypeEnum = z.enum([
  'Harm Reduction Services',
  'Syringe Pick-Up',
  'Community Education and Advocacy',
  'In-Kind Fundraising',
  'Building Work Days',
  'Fundraising',
  'Special Events',
]);

const zEventBase = z.object({
  eventName: z.string(),
  eventStart: z.date(),
  eventEnd: z.date(),
  eventDescription: z.string(),
  eventType: eventTypeEnum,
});

// Extend to create request, response, and entity types with zBase for event
export const zEventEntity = zEventBase.extend({ ...zBase.shape });
export const zEventRequest = zEventBase;
export const zEventResponse = zEventEntity;

export interface EventEntity extends z.infer<typeof zEventEntity> {}

export interface EventRequest extends z.infer<typeof zEventRequest> {}

export interface EventResponse extends z.infer<typeof zEventResponse> {}
