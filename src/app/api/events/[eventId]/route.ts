import { NextRequest, NextResponse } from 'next/server';
import { zObjectId } from '@/types/objectId';
import { getEvent, updateEvent } from '@/server/actions/event';
import { zUpdateEventRequest } from '@/types/event';

export async function GET(
  _request: NextRequest,
  { params }: { params: { eventId: string } }
) {
  const formId = params.eventId;
  const validationResult = zObjectId.safeParse(formId);
  if (!validationResult.success) {
    return NextResponse.json({ message: 'invalid id' }, { status: 400 });
  }

  const response = await getEvent(formId);
  if (response === null) {
    return NextResponse.json({ message: 'User not found ' }, { status: 404 });
  }
  return NextResponse.json(response, { status: 200 });
}

export async function PUT(request: NextRequest, {params}: {params: {eventId:string}}) {
  // Checking the data for bad formats
  const formId = params.eventId;
  const idValidationResult = zObjectId.safeParse(formId);
  if (!idValidationResult.success) {
    return NextResponse.json({ message: 'invalid id' }, {status: 400});
  }

  try {
    const stuffToChange = await request.json(); // Turning the request into a readable json file
    const requestValidationResult = zUpdateEventRequest.safeParse(stuffToChange);
    if (!requestValidationResult.success) {
      return NextResponse.json({ message: 'bad request'}, {status: 400}); // This wasn't explicitly stated in the story, but I've added this because I'm pretty sure it needs to be in here
    }
    const updatedEvent = await updateEvent(params.eventId, stuffToChange);
    
    if (!updatedEvent) {
      return NextResponse.json({error: 'Item not found'}, {status: 404});
    }
    else {
      return NextResponse.json(updatedEvent, {status: 200});
    }
  }
  catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {error: 'Failed to update item information', details: message },
      {status: 500}
    );
  }
}