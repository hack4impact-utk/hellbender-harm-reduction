import { NextRequest, NextResponse } from 'next/server';
import { zObjectId } from '@/types/objectId';
import { deleteFacts, updateFacts } from '@/server/actions/facts';
import { zUpdateFactsRequest } from '@/types/facts';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { factId: string } }
) {
  try {
    const validationResult = zObjectId.safeParse(params.factId);
    if (!validationResult.success) {
      return NextResponse.json({ message: 'Bad Id' }, { status: 500 });
    }

    await deleteFacts(params.factId);

    return new NextResponse(undefined, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { factId: string } }
) {
  try {
    const idValidationResult = zObjectId.safeParse(params.factId);
    if (!idValidationResult.success) {
      return NextResponse.json({ message: 'Bad Id' }, { status: 500 });
    }

    const data = await req.json();
    const validationResult = zUpdateFactsRequest.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: 'Could not validate' },
        { status: 500 }
      );
    }
    await updateFacts(params.factId, data);

    return new NextResponse(undefined, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
