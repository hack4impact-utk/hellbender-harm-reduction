import dbConnect from '@/utils/db-connect';
import Event from '@/server/models/event';
import { CreateEventRequest, EventResponse } from '@/types/event';

export async function getAllEvents(): Promise<EventResponse[]> {
  let response: EventResponse[];
  try {
    await dbConnect();

    response = await Event.find();
  } catch (error) {
    throw error;
  }
  return response;
}

export async function createEvent(event: CreateEventRequest) {
  await dbConnect();
  return await Event.create(event);
}
