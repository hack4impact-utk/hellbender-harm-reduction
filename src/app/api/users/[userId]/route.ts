import { NextRequest, NextResponse } from 'next/server';
import { zObjectId } from '@/types/objectId';
import { deleteUser, updateUserAction } from '@/server/actions/user';
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

    return new NextResponse(undefined, { status: 204 });
  } catch (error) {
    return error;
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
    await updateUserAction(params.userId, data);

    return new NextResponse(undefined, { status: 204 });
  } catch (error) {
    return error;
  }
}
