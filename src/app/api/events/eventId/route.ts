import { NextRequest, NextResponse } from 'next/server';
import { zObjectId } from '@/types/objectId';
import { deleteEvent, getEvent } from '@/server/actions/event';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const validationResult = zObjectId.safeParse(params.eventId);
    if (!validationResult.success) {
      return NextResponse.json({ message: 'Bad Id' }, { status: 500 });
    }

    await deleteEvent(params.eventId);

    return new NextResponse(undefined, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

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
