import { getAllUsers, createUser } from '@/server/actions/user';
import { zUserRequest } from '@/types/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  try {
    const users = await getAllUsers();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
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
