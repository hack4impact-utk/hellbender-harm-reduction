import dbConnect from '@/utils/db-connect';
import UserSchema from '@/server/models/user';
import { UserResponse, UserRequest, UpdateUserRequest } from '@/types/user';
import { isValidObjectId } from 'mongoose';

export async function getAllUsers(): Promise<UserResponse[]> {
  let response: UserResponse[];
  try {
    await dbConnect();

    response = await UserSchema.find();
  } catch (error) {
    throw error;
  }
  return response;
}

export async function createUser(request: UserRequest): Promise<string> {
  try {
    await dbConnect();
    const user = await UserSchema.create(request);
    return user._id.toString();
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(userId: string): Promise<void> {
  if (isValidObjectId(userId)) {
    try {
      await dbConnect();
      await UserSchema.deleteMany({
        user: userId,
      });

      const res = await UserSchema.findByIdAndDelete(userId);
      if (!res) {
        throw new Error('Could not Delete');
      }
    } catch (error) {
      throw error;
    }
  }
}

export async function getUser(userId: string): Promise<UserResponse | null> {
  if (!isValidObjectId(userId)) {
    throw new Error('bad User Id');
  }

  let target: UserResponse | null;
  try {
    await dbConnect();
    target = await UserSchema.findById(userId).lean();
  } catch (error) {
    throw error;
  }

  if (!target) {
    throw new Error();
  }

  return target;
}

export async function getUserBy(query: object): Promise<UserResponse[] | null> {
  let target: UserResponse[] | null;

  try {
    await dbConnect();
    target = await UserSchema.find(query);
  } catch (error) {
    throw error;
  }

  if (!target) {
    throw new Error();
  }

  return target;
}

export async function updateUser(
  userId: string,
  updatedUser: UpdateUserRequest
): Promise<void> {
  if (!isValidObjectId(userId)) {
    throw new Error('bad user id');
  }

  if (!updatedUser || Object.keys(updatedUser).length === 0) {
    throw new Error('bad UpdateUserRequest');
  }

  let res;
  try {
    await dbConnect();
    res = await UserSchema.findByIdAndUpdate(userId, updatedUser);
  } catch (error) {
    throw error;
  }

  if (!res) {
    throw new Error();
  }
}

export async function updateUserAction(
  userId: string,
  userUpdatesRequest: UpdateUserRequest
): Promise<void> {
  if (!isValidObjectId(userId)) {
    throw new Error('bad user id');
  }

  if (!userUpdatesRequest || Object.keys(userUpdatesRequest).length === 0) {
    throw new Error('bad UpdateUserRequest');
  }

  let res;
  try {
    await dbConnect();
    res = await UserSchema.findByIdAndUpdate(userId, userUpdatesRequest);
  } catch (error) {
    throw error;
  }

  if (!res) {
    throw new Error();
  }
}
