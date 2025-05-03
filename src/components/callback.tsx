'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AuthCallback() {
  const { data: session } = useSession();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      if (!session?.user?.email) {
        router.push('/');
        return;
      }

      try {
        const res = await fetch(
          `/api/users?email=${encodeURIComponent(session.user.email)}`
        );
        const data = await res.json();

        const user = data?.[0];

        if (!user) {
          router.push('/');
        } else if (user.hasAllRequiredFields) {
          router.push('/calendar');
        } else {
          router.push(`/signUpForm/${user._id}`);
        }
      } catch (err) {
        console.error('Error fetching user info:', err);
        router.push('/');
      } finally {
        setChecking(false);
      }
    };

    checkUser();
  }, [session, router]);

  return <div>{checking ? 'Checking your account...' : 'Redirecting...'}</div>;
}
