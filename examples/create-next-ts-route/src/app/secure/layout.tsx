'use client'

import { useAuth } from "@auth-kit/next/useAuth"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const isAuth = useAuth({ fallbackPath: '/login'});
    console.log("Calling Layout");
    console.log(isAuth);
    
    
    if(isAuth){
        return children;
    }
    else {
        return <></>;
    }
  }