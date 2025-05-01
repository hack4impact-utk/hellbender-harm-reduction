import dbConnect from '@/utils/db-connect';
import { isValidObjectId } from 'mongoose';
import FactsSchema from '@/server/models/facts';
import {
  CreateFactsRequest,
  FactsResponse,
  UpdateFactsRequest,
} from '@/types/facts';

export async function getAllFacts(): Promise<FactsResponse[]> {
  let response: FactsResponse[];
  try {
    await dbConnect();

    response = await FactsSchema.find();
  } catch (error) {
    throw error;
  }
  return response;
}

export async function createFacts(
  event: CreateFactsRequest
): Promise<FactsResponse> {
  await dbConnect();

  const response = await FactsSchema.create(event);

  return response as FactsResponse;
}

export async function deleteFacts(factId: string): Promise<void> {
  if (isValidObjectId(factId)) {
    try {
      await dbConnect();
      await FactsSchema.deleteMany({
        fact: factId,
      });

      const res = await FactsSchema.findByIdAndDelete(factId);
      if (!res) {
        throw new Error('500 Could Not Delete');
      }
    } catch (error) {
      throw error;
    }
  }
}

export async function updateFacts(
  factId: string,
  factUpdatesRequest: UpdateFactsRequest
): Promise<void> {
  if (!isValidObjectId(factId)) {
    throw new Error('400 Bad Fact Id');
  }

  if (!factUpdatesRequest || Object.keys(factUpdatesRequest).length === 0) {
    throw new Error('500 Bad UpdateFactsRequest');
  }

  let res;
  try {
    await dbConnect();
    res = await FactsSchema.findByIdAndUpdate(factId, factUpdatesRequest);
  } catch (error) {
    throw new Error('500 Could Not Update');
  }

  if (!res) {
    throw new Error('404 Fact Not Found');
  }
}
