import dbConnect from '@/utils/db-connect';
import EventSchema from '@/server/models/event';
import {
  CreateEventRequest,
  EventResponse,
  UpdateEventRequest,
} from '@/types/event';
import { isValidObjectId } from 'mongoose';

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

export async function getEvent(eventId: string): Promise<EventResponse | null> {
  if (!isValidObjectId(eventId)) {
    throw new Error('400 Bad Id');
  }

  let target: EventResponse | null;
  try {
    await dbConnect();
    target = await EventSchema.findById(eventId).lean();
  } catch (error) {
    throw new Error('500 User lookup failed');
  }

  if (!target) {
    throw new Error('404 Event not found');
  }

  return target;
}

export async function getEventBy(
  query: object
): Promise<EventResponse[] | null> {
  let target: EventResponse[] | null;

  try {
    await dbConnect();
    target = await EventSchema.find(query);
  } catch (error) {
    throw new Error('500 User lookup failed');
  }

  if (!target) {
    throw new Error('404 Events not found');
  }

  return target;
}

export async function updateEvent(  // Returns the updated event or null upon error
  eventId: string,
  updatedData: UpdateEventRequest
): Promise<EventResponse | null> {
  let response: EventResponse | null;

  try {
    await dbConnect();
    response = await EventSchema.findByIdAndUpdate(
      eventId,
      { $set: updatedData },  // $set makes the function update new fields and leave the old fields unchanged (in contrast to the default of deleting them)
      { new: true }           // makes the function return the updated document
    );
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}
