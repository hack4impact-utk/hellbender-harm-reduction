import { BasicInfo } from '@/components/ProfilePage/index'
import { getUser } from '@/server/actions/user';

export default async function Home() {
  const user = await getUser("67bc854cecd286e252e1a54d"); // Changeme
  if (!user) {
    return;
  }
  return (
    <div>
      <h1>Home page</h1>
      <BasicInfo name={user.name} pronouns={user.pronouns} profilePicture={user.image} />
    </div>
  );
}
