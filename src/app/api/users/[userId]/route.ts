import { NextRequest, NextResponse } from 'next/server';
import { zObjectId } from '@/types/objectId';
import { deleteUser } from '@/server/actions/user';

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
