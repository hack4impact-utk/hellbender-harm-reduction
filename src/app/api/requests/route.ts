import { NextRequest, NextResponse } from 'next/server';
import { createRequests, getAllRequests } from '@/server/actions/requests';
import { zRequestsRequest } from '@/types/requests';

export async function GET(): Promise<NextResponse> {
  try {
    const response = await getAllRequests();
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const validationResult = zRequestsRequest.safeParse(requestBody);
  if (validationResult.success) {
    const form = await createRequests(requestBody);

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
