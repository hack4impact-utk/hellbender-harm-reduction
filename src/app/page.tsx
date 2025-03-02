import {BasicInfo} from '@/components/ProfilePage/index'
import { getUser } from '@/server/actions/user';

export default async function Home() {
  const user = await getUser("673a4e39f0a55dbb5fc5e0b4");
  if (!user) {
    return;
  }
  return (
    <div>
      <h1>Home page</h1>
      <BasicInfo name={user.name} pronouns={user.pronouns} profilePicture={user.picture} />
    </div>
  );
}
