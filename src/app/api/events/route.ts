import { createEvent, getAllEvents } from '@/server/actions/event';
import { zCreateEventRequest } from '@/types/event';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  try {
    const events = await getAllEvents();
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const validationResult = zCreateEventRequest.safeParse(requestBody);
  if (validationResult.success) {
    const form = await createEvent(requestBody);

    return NextResponse.json({ _id: form._id }, { status: 201 });
  } else {
    return NextResponse.json(
      {
        message: 'Input was not in correct format',
        errors: validationResult.error.format(),
      },
      { status: 400 }
    );
  }
}
