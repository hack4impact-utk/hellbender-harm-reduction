import dbConnect from '@/utils/db-connect';
import UserSchema from '@/server/models/user';
import { UserResponse, UserRequest } from '@/types/user';

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
