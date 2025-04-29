'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function AuthCallback() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return; // wait until session is ready

    const checkProfile = async () => {
      // Assume your user data is tied to session.user.email
      const email = session?.user?.email;
      const user_id = '0000';

      if (!email) {
        router.push('/error'); // or whatever you want
        return;
      }

      try {
        // Example API call to check user data
        // const res = await fetch(`/api/check-profile?email=${email}`);
        // const { hasFullProfile } = await res.json();
        const hasFullProfile = false;

        if (hasFullProfile) {
          router.push('/calender'); // user complete, go to dashboard
        } else {
          router.push('/signUpForm/' + user_id); // user incomplete, finish signup
        }
      } catch (error) {
        console.error('Error checking profile:', error);
        router.push('/error');
      }
    };

    checkProfile();
  }, [session, status, router]);

  return <div>Checking your profile...</div>;
}
