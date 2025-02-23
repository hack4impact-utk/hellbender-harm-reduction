import { NextRequest, NextResponse } from 'next/server';
import { zObjectId } from '@/types/objectId';
import {
  deleteCert,
  updateCert,
  getCert,
} from '@/server/actions/certification';
import { zUpdateCertRequest } from '@/types/certification';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { certId: string } }
) {
  try {
    const validationResult = zObjectId.safeParse(params.certId);
    if (!validationResult.success) {
      return NextResponse.json({ message: 'Bad Id' }, { status: 500 });
    }

    await deleteCert(params.certId);

    return new NextResponse(undefined, { status: 200 });
  } catch (error) {
    return error;
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { certId: string } }
) {
  try {
    const idValidationResult = zObjectId.safeParse(params.certId);
    if (!idValidationResult.success) {
      return NextResponse.json({ message: 'Bad Id' }, { status: 500 });
    }

    const data = await req.json();
    const validationResult = zUpdateCertRequest.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: 'Could not validate' },
        { status: 500 }
      );
    }
    await updateCert(params.certId, data);

    return new NextResponse(undefined, { status: 200 });
  } catch (error) {
    return error;
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { certId: string } }
) {
  const formId = params.certId;
  const validationResult = zObjectId.safeParse(formId);
  if (!validationResult.success) {
    return NextResponse.json({ message: 'invalid id' }, { status: 400 });
  }

  const response = await getCert(formId);
  if (response === null) {
    return NextResponse.json({ message: 'User not found ' }), { status: 404 };
  }
  return NextResponse.json(response, { status: 200 });
}
