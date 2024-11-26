'use client'

import { useUser } from '@/context/userContext';
import { handleStravaCallback } from '@/lib/handleStravaCallback';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'

type Props = {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const { user, isLoading } = useUser(); 
  const router = useRouter();  

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/home");
    }
  }, [user, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isLoading && user) {
    return <>{children}</>
  }
}
