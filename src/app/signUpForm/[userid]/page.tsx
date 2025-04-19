import { SignUpInfoForm } from '@/components/signupform';
import SignInUpView from '@/views/signInUpView';

export default async function Home() {
  return (
    <div>
      <SignInUpView _form={<SignUpInfoForm />}></SignInUpView>
    </div>
  );
}
