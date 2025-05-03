import { getAllUsers, createUser, getUserBy } from '@/server/actions/user';
import { zUserRequest } from '@/types/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: Request): Promise<NextResponse> {
  const url = new URL(req.url);
  const query = Object.fromEntries(url.searchParams.entries());

  try {
    if (Object.keys(query).length === 0) {
      // If no query parameters, return all users
      const response = await getAllUsers();
      return NextResponse.json(response, { status: 200 });
    } else {
      // If there are query parameters, return filtered users

      const response = await getUserBy(query);
      return NextResponse.json(response, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

/*export async function GET(req: Request): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const query = Object.fromEntries(url.searchParams.entries());
    const response = await getUserBy(query)
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
  }
}*/

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
