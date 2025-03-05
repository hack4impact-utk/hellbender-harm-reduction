import { createEvent, getAllEvents } from '@/server/actions/event';
import { getUserBy } from '@/server/actions/user';
import { zCreateEventRequest } from '@/types/event';
import { NextRequest, NextResponse } from 'next/server';

// export async function GET(): Promise<NextResponse> {
//   try {
//   } catch (error) {
//     return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
//   }
// }
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Extract the email query parameter
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      const events = await getAllEvents();
      return NextResponse.json(events, { status: 200 });
    }

    // Fetch user by email
    const users = await getUserBy({ email });

    if (!users || users.length === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(users[0], { status: 200 }); // Return the first matching user
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
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
