import { NextRequest, NextResponse } from 'next/server';
import { zObjectId } from '@/types/objectId';
import { deleteUser, updateUser, getUser } from '@/server/actions/user';
import { zUpdateUserRequest } from '@/types/user';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const validationResult = zObjectId.safeParse(params.userId);
    if (!validationResult.success) {
      return NextResponse.json({ message: 'Bad Id' }, { status: 500 });
    }

    await deleteUser(params.userId);

    return new NextResponse(undefined, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const idValidationResult = zObjectId.safeParse(params.userId);
    if (!idValidationResult.success) {
      return NextResponse.json({ message: 'Bad Id' }, { status: 500 });
    }

    const data = await req.json();
    const validationResult = zUpdateUserRequest.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: 'Could not validate' },
        { status: 500 }
      );
    }
    await updateUser(params.userId, data);

    return new NextResponse(undefined, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const formId = params.userId;
    const validationResult = zObjectId.safeParse(formId);
    if (!validationResult.success) {
      return NextResponse.json({ message: 'invalid id' }, { status: 400 });
    }

    const response = await getUser(formId);
    if (response === null) {
      return NextResponse.json({ message: 'User not found ' }, { status: 404 });
    }
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
