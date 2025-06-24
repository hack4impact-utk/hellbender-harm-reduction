import { NextRequest, NextResponse } from 'next/server';
import { zObjectId } from '@/types/objectId';
import { deleteRequests, updateRequests } from '@/server/actions/requests';
import { zUpdateRequestsRequest } from '@/types/requests';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { reqId: string } }
) {
  try {
    const validationResult = zObjectId.safeParse(params.reqId);
    if (!validationResult.success) {
      return NextResponse.json({ message: 'Bad Id' }, { status: 500 });
    }

    await deleteRequests(params.reqId);

    return new NextResponse(undefined, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { reqId: string } }
) {
  try {
    const idValidationResult = zObjectId.safeParse(params.reqId);
    if (!idValidationResult.success) {
      return NextResponse.json({ message: 'Bad Id' }, { status: 500 });
    }

    const data = await req.json();
    const validationResult = zUpdateRequestsRequest.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: 'Could not validate' },
        { status: 500 }
      );
    }
    await updateRequests(params.reqId, data);

    return new NextResponse(undefined, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
