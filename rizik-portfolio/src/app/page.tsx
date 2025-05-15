'use client';

import dynamic from 'next/dynamic';

// Dynamically import the Home component with SSR disabled
const Home = dynamic(() => import('@/components/home/Home'), {
  ssr: false,
});

export default function Page() {
  return <Home />;
}
