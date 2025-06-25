import dbConnect from '@/utils/db-connect';
import { isValidObjectId } from 'mongoose';
import RequestsSchema from '@/server/models/requests';
import {
  RequestsRequest,
  RequestsResponse,
  UpdateRequestsRequest,
} from '@/types/requests';

export async function getAllRequests(): Promise<RequestsResponse[]> {
  let response: RequestsResponse[];
  try {
    await dbConnect();

    response = await RequestsSchema.find();
  } catch (error) {
    throw error;
  }
  return response;
}

export async function createRequests(
  req: RequestsRequest
): Promise<RequestsResponse> {
  await dbConnect();

  const response = await RequestsSchema.create(req);

  return response as RequestsResponse;
}

export async function deleteRequests(reqId: string): Promise<void> {
  if (isValidObjectId(reqId)) {
    try {
      await dbConnect();
      await RequestsSchema.deleteMany({
        req: reqId,
      });

      const res = await RequestsSchema.findByIdAndDelete(reqId);
      if (!res) {
        throw new Error('500 Could Not Delete');
      }
    } catch (error) {
      throw error;
    }
  }
}

export async function updateRequests(
  reqId: string,
  reqUpdatesRequest: UpdateRequestsRequest
): Promise<void> {
  if (!isValidObjectId(reqId)) {
    throw new Error('400 Bad Request Id');
  }

  if (!reqUpdatesRequest || Object.keys(reqUpdatesRequest).length === 0) {
    throw new Error('500 Bad UpdateRequestsRequest');
  }

  let res;
  try {
    await dbConnect();
    res = await RequestsSchema.findByIdAndUpdate(reqId, reqUpdatesRequest);
  } catch (error) {
    throw new Error('500 Could Not Update');
  }

  if (!res) {
    throw new Error('404 Fact Not Found');
  }
}
