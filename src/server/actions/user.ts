import dbConnect from '@/utils/db-connect';
import User from '@/server/models/user';
import { UserResponse } from '@/types/user';

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
