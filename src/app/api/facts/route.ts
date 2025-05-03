import { NextRequest, NextResponse } from 'next/server';
import { createFacts, getAllFacts } from '@/server/actions/facts';
import { zCreateFactsRequest } from '@/types/facts';

export async function GET(): Promise<NextResponse> {
  try {
    const response = await getAllFacts();
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const validationResult = zCreateFactsRequest.safeParse(requestBody);
  if (validationResult.success) {
    const form = await createFacts(requestBody);

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
