import dbConnect from '@/utils/db-connect';
import EventSchema from '@/server/models/event';
import { CreateEventRequest, EventResponse } from '@/types/event';
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
    throw new Error('bad Event Id');
  }

  let target: EventResponse | null;
  try {
    await dbConnect();
    target = await EventSchema.findById(eventId).lean();
  } catch (error) {
    throw error;
  }

  if (!target) {
    throw new Error();
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
    throw error;
  }

  if (!target) {
    throw new Error();
  }

  return target;
}
