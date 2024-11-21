'use client'

import { useUser } from '@/context/userContext';
import { handleStravaCallback } from '@/lib/handleStravaCallback';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'

type Props = {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const { user, isLoading, setUser, setIsLoading } = useUser(); // useUserフックからユーザー情報を取得
  const searchParams = useSearchParams();
  const router = useRouter();

  const code = searchParams.get('code');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/home");
    }
  }, [user, isLoading]);

  useEffect(() => {
    
    if(code) {
      handleStravaCallback(code, setUser, setIsLoading, )
    } else {
      setIsLoading(false)
    }
  }, [code, setUser, setIsLoading])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isLoading && user) {
    return <>{children}</>
  }
}
