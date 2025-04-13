import SignInForm from '@/components/signin';
import SignInUpView from '@/views/signInUpView';

export default async function Home() {
  return (
    <div>
      <div>
        <SignInUpView
          _form={<SignInForm email="" password="" />}
        ></SignInUpView>
      </div>
    </div>
  );
}
