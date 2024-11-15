import dbConnect from '@/utils/db-connect';
import User from '@/server/models/user';
import { UserResponse, UserRequest } from '@/types/user';

export async function getAllUsers(): Promise<UserResponse[]> {
  let response: UserResponse[];
  try {
    await dbConnect();

    response = await User.find();
  } catch (error) {
    throw error;
  }
  return response;
}

export async function createUser(request: UserRequest): Promise<string> {
  try {
    await dbConnect();
    const user = await User.create(request);
    return user._id.toString();
  } catch (error) {
    throw error;
  }
}
