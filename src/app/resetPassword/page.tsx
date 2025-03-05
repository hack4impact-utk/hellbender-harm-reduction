import ResetPassForm from '@/components/resetpass';
import SignInUpView from '@/views/signInUpView';

export default async function Home() {
  return (
    <div>
      <SignInUpView _form={<ResetPassForm email="" />}></SignInUpView>
    </div>
  );
}
