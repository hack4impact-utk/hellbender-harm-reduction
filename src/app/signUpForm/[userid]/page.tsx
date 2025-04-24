import SignInUpView from '@/views/signInUpView';
import { SignUpInfoForm } from '@/components/signupform';
import { notFound } from 'next/navigation';
import { getUser } from '@/server/actions/user'; // adjust path as needed
import { UserResponse } from '@/types/user';
import { SignUpFormData } from '@/types/form/signUp';

export default async function Home({
  params,
}: {
  params: { userid?: string };
}) {
  const userId = params?.userid;
  let formattedUser: Partial<SignUpFormData> = {};

  if (userId) {
    try {
      const user: UserResponse | null = await getUser(userId);

      // Map user to form format
      formattedUser = {
        name: user?.name,
        email: user?.email,
        image: user?.image,
        phone: user?.phone,
        pronouns: user?.pronouns,
        emergencyContact: {
          ecName: user?.emergencyContacts?.ecName || '',
          ecPhone: user?.emergencyContacts?.ecPhone || '',
        },
        eventPreferences: user?.eventPreferences,
        eventNotif: user?.newEvents || 'No Events',
        referralSource: user?.referrals,
        accomm: user?.accomm,
        otherAccomm: user?.otherAccomm,
      };
    } catch (err) {
      console.error('Error fetching user:', err);
      notFound();
    }
  }

  return (
    <div>
      <SignInUpView _form={<SignUpInfoForm user={formattedUser} />} />
    </div>
  );
}
