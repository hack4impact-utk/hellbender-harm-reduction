import { getAllUsers } from '@/server/actions/user';
import { AllVolunteers } from '@/components/allvolunteers';
import Topbar from '@/components/navbar';

export default async function Home() {
  const data = await getAllUsers();

  return (
    <div>
      <Topbar />
      <AllVolunteers data={data} />
    </div>
  );
}
