import { NextRequest, NextResponse } from 'next/server';
import { zObjectId } from '@/types/objectId';
import { getEvent } from '@/server/actions/event';

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
