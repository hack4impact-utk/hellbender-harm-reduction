import { getAllUsers, createUser, getUserBy } from '@/server/actions/user';
import { zUserRequest } from '@/types/user';
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
      const users = await getAllUsers();
      return NextResponse.json(users, { status: 200 });
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
  try {
    const req = await request.json();
    const validationResult = zUserRequest.safeParse(req);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: 'Incorrect Input Format' },
        { status: 400 }
      );
    }

    const res = await createUser(validationResult.data);
    return NextResponse.json({ id: res }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Unknown Error' }, { status: 501 });
  }
}
