import { NextRequest, NextResponse } from 'next/server';
import { zObjectId } from '@/types/objectId';
import { deleteTag, updateTag, getTag } from '@/server/actions/certification';
import { zUpdateTagRequest } from '@/types/certification';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { tagId: string } }
) {
  try {
    const validationResult = zObjectId.safeParse(params.tagId);
    if (!validationResult.success) {
      return NextResponse.json({ message: 'Bad Id' }, { status: 500 });
    }

    await deleteTag(params.tagId);

    return new NextResponse(undefined, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { tagId: string } }
) {
  try {
    const idValidationResult = zObjectId.safeParse(params.tagId);
    if (!idValidationResult.success) {
      return NextResponse.json({ message: 'Bad Id' }, { status: 500 });
    }

    const data = await req.json();
    const validationResult = zUpdateTagRequest.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: 'Could not validate' },
        { status: 500 }
      );
    }
    await updateTag(params.tagId, data);

    return new NextResponse(undefined, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { tagId: string } }
) {
  try {
    const formId = params.tagId;
    const validationResult = zObjectId.safeParse(formId);
    if (!validationResult.success) {
      return NextResponse.json({ message: 'invalid id' }, { status: 400 });
    }

    const response = await getTag(formId);
    if (response === null) {
      return NextResponse.json({ message: 'User not found ' }, { status: 404 });
    }
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
