'use client'

import { useEffect, useState } from "react";
import RecentActivityCard from "./_components/RecentActivityCard";
import { useRouter, useSearchParams } from "next/navigation";
import { handleStravaCallback } from "@/lib/handleStravaCallback";
import { useUser } from "@/context/userContext";

export default function AuthenticatedHomePage() {
  const { user, setUser, setIsLoading } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get('code');
    console.log("code: ", code);
    
    if (code) {
      handleStravaCallback(code, setUser, setIsLoading);
    }
  }, [searchParams])

return (
  <div className='mx-5'>
    <RecentActivityCard />
  </div>
)
}
