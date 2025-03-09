import { getUserBy } from '@/server/actions/user';
import { UserResponse } from '@/types/user';
import ProfileView from '@/views/profileView';

export default async function Home({ params }: { params: { userId: string } }) {
  const users: UserResponse[] | null = await getUserBy({
    _id: params.userId,
  });
  if (!users) {
    throw 'error';
  }
  const user: UserResponse = users[0];

  return (
    <div>
      <ProfileView
        profilePicture={user?.image}
        name={user?.name}
        pronouns={user?.pronouns}
        email={user?.email}
        phone={user?.phone}
      ></ProfileView>
    </div>
  );
}
