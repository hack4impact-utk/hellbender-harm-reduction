import dynamic from 'next/dynamic';

const AuthCallback = dynamic(() => import('@/components/callback'), {
  ssr: false,
});

export default function Home() {
  return <AuthCallback />;
}
