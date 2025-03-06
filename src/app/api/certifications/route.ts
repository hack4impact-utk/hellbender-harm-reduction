import {
  createCert,
  getAllCerts,
  getCertBy,
} from '@/server/actions/certification';
import { zCreateCertRequest } from '@/types/certification';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: Request): Promise<NextResponse> {
  const url = new URL(req.url);
  const query = Object.fromEntries(url.searchParams.entries());

  try {
    if (Object.keys(query).length === 0) {
      // If no query parameters, return all events
      const response = await getAllCerts();
      return NextResponse.json(response, { status: 200 });
    } else {
      // If there are query parameters, return filtered events
      const response = await getCertBy(query);
      return NextResponse.json(response, { status: 200 });
    }
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
