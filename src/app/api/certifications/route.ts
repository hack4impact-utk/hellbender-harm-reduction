import { createCert, getAllCerts } from '@/server/actions/certification';
import { zCreateCertRequest } from '@/types/certification';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  try {
    const events = await getAllCerts();
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const validationResult = zCreateCertRequest.safeParse(requestBody);
  if (validationResult.success) {
    const form = await createCert(requestBody);

    return NextResponse.json({ _id: form._id }, { status: 201 });
  } else {
    return NextResponse.json(
      {
        message: 'Input was not in correct format',
        errors: validationResult.error.format(),
      },
      { status: 400 }
    );
  }
}
