import SignUpForm from '@/components/createaccount';
import SignInUpView from '@/views/signInUpView';

export default async function Home() {
  return (
    <div>
      <SignInUpView
        _form={<SignUpForm email="" name="" password="" />}
      ></SignInUpView>
    </div>
  );
}
