import dbConnect from '@/utils/db-connect';
import TagSchema from '@/server/models/tag';
import { CreateTagRequest, TagResponse, UpdateTagRequest } from '@/types/tag';
import { isValidObjectId } from 'mongoose';

export async function getAllTags(): Promise<TagResponse[]> {
  let response: TagResponse[];
  try {
    await dbConnect();

    response = await TagSchema.find();
  } catch (error) {
    throw error;
  }
  return response;
}

export async function createTag(event: CreateTagRequest): Promise<TagResponse> {
  await dbConnect();

  const response = await TagSchema.create(event);

  return response as TagResponse;
}

export async function deleteTag(tagId: string): Promise<void> {
  if (isValidObjectId(tagId)) {
    try {
      await dbConnect();
      await TagSchema.deleteMany({
        tag: tagId,
      });

      const res = await TagSchema.findByIdAndDelete(tagId);
      if (!res) {
        throw new Error('500 Could Not Delete');
      }
    } catch (error) {
      throw error;
    }
  }
}

export async function getTag(tagId: string): Promise<TagResponse | null> {
  if (!isValidObjectId(tagId)) {
    throw new Error('400 Bad Id');
  }

  let target; // : CertResponse | null;
  try {
    await dbConnect();
    target = await TagSchema.findById(tagId);
  } catch (error) {
    throw new Error('500 tag lookup failed');
  }

  if (!target) {
    throw new Error('404 tag not found');
  }

  return target as TagResponse;
}

export async function updateTag(
  tagId: string,
  tagUpdatesRequest: UpdateTagRequest
): Promise<void> {
  if (!isValidObjectId(tagId)) {
    throw new Error('400 Bad Tag Id');
  }

  if (!tagUpdatesRequest || Object.keys(tagUpdatesRequest).length === 0) {
    throw new Error('500 Bad UpdateTagRequest');
  }

  let res;
  try {
    await dbConnect();
    res = await TagSchema.findByIdAndUpdate(tagId, tagUpdatesRequest);
  } catch (error) {
    throw new Error('500 Could Not Update');
  }

  if (!res) {
    throw new Error('404 Tag Not Found');
  }
}

export async function getTagBy(query: object): Promise<TagResponse[] | null> {
  let target: TagResponse[] | null;

  try {
    await dbConnect();
    target = await TagSchema.find(query);
  } catch (error) {
    throw new Error('500 tag lookup failed');
  }

  if (!target) {
    throw new Error('404 tags not found');
  }

  return target;
}
