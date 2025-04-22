import VolunteersView from '@/views/volunteersView';
import { getAllUsers } from '@/server/actions/user';

export default async function Home() {
  const userdata = await getAllUsers();
  const safeUsers = userdata.map((user) => JSON.parse(JSON.stringify(user)));
  return (
    <div>
      <VolunteersView data={safeUsers} />
    </div>
  );
}
