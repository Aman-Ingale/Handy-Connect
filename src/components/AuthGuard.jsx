'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem('id');

    if (!id) {
      router.push('/');
    } else {
      setIsAuth(true);
    }

    setChecked(true);
  }, []);

  if (!checked) return null; // Prevent flicker before check finishes

  return isAuth ? children : null;
}
