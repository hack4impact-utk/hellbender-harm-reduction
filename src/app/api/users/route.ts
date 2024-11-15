import { getAllUsers } from '@/server/actions/user';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  try {
    const users = await getAllUsers();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
  }
}
