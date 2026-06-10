'use client';
import { SessionProvider, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

function TokenSync() {
  const { data: session } = useSession();
  
  useEffect(() => {
    if (session?.user?.backendToken) {
      Cookies.set('token', session.user.backendToken, { expires: 30 });
    }
  }, [session]);

  return null;
}

export default function AuthProvider({ children }) {
  return (
    <SessionProvider>
      <TokenSync />
      {children}
    </SessionProvider>
  );
}
