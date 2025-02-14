'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApi } from '@/components/hooks';
import { setUser } from '@/store/app';
import { removeClientAuthToken } from '@/lib/client';

export function LogoutPage() {
  const disabled = !!(process.env.disableLogin || process.env.cloudMode);
  const router = useRouter();
  const { post } = useApi();

  useEffect(() => {
    async function logout() {
      await post('/auth/logout');
    }

    if (!disabled) {
      removeClientAuthToken();

      logout();

      router.push('/login');

      return () => setUser(null);
    }
  }, [disabled, router, post]);

  return null;
}
