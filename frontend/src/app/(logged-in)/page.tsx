'use client'

import { useEffect, useState } from "react";
import RecentActivityCard from "./_components/RecentActivityCard";
import { useSearchParams } from "next/navigation";
import { handleStravaCallback } from "@/lib/handleStravaCallback";
import { useUser } from "@/context/userContext";

export default function Homepage() {
  const {user, setUser} = useUser();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    console.log("code: ",code);
    
    if (code) {
      handleStravaCallback(code, setUser);
    }
}, [searchParams])
  return (
    <div className='mx-5'>
      <RecentActivityCard />
    </div>
  )
}
