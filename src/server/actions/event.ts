import dbConnect from '@/utils/db-connect';
import EventSchema from '@/server/models/event';
import { CreateEventRequest, EventResponse } from '@/types/event';

export async function getAllEvents(): Promise<EventResponse[]> {
  let response: EventResponse[];
  try {
    await dbConnect();

    response = await EventSchema.find();
  } catch (error) {
    throw error;
  }
  return response;
}

export async function createEvent(
  event: CreateEventRequest
): Promise<EventResponse> {
  await dbConnect();

  const response: EventResponse = await EventSchema.create(event);

  return response as EventResponse;
}
