import { handler } from '@/app/api/auth/[...nextauth]/auth';
import AuthCallback from '@/components/callback';
import { getUserBy } from '@/server/actions/user';
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession(handler);

  if (!session?.user?.email) {
    // Redirect or render error here
    return <div>No email in session. Please sign in again.</div>;
  }

  let user = null;
  try {
    const result = await getUserBy({ email: session.user.email });
    user = result?.[0] || null;
  } catch (error) {
    console.error('Error fetching user:', error);
  }

  return (
    <div>
      <AuthCallback user={user}></AuthCallback>
    </div>
  );
}
