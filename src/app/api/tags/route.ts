import { createTag, getAllTags, getTagBy } from '@/server/actions/tag';
import { zCreateTagRequest } from '@/types/tag';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: Request): Promise<NextResponse> {
  const url = new URL(req.url);
  const query = Object.fromEntries(url.searchParams.entries());

  try {
    if (Object.keys(query).length === 0) {
      // If no query parameters, return all events
      const response = await getAllTags();
      return NextResponse.json(response, { status: 200 });
    } else {
      // If there are query parameters, return filtered events
      const response = await getTagBy(query);
      return NextResponse.json(response, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Unknown Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const validationResult = zCreateTagRequest.safeParse(requestBody);
  if (validationResult.success) {
    const form = await createTag(requestBody);

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
