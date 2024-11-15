import { getAllEvents } from '@/server/actions/event';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  try {
    const events = await getAllEvents();
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
  }
}
