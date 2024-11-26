'use client'

import { useEffect, useState } from "react";
import RecentActivityCard from "./_components/RecentActivityCard";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/context/userContext";

export default function AuthenticatedHomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {user} = useUser();
  console.log('user:', user);
  

return (
  <div className='mx-5'>
    <RecentActivityCard />
  </div>
)
}
