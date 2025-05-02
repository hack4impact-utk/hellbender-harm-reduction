'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthCallback({ user }: { user: any }) {
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      console.error('Error: cannot find user');
      /* This needs to be fixed with a real value */
    } else if (user.hasAllRequiredFields) {
      router.push('/calender');
    } else {
      router.push('/signUpForm/' + user._id); // user incomplete, finish signup
    }
  }, [user, router]);

  return <div>Redirecting...</div>;
}
