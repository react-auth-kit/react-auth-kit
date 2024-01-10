'use client';

import * as React from 'react'
import { useRouter } from "next/navigation";

export const Auth = () => {
    const { push } = useRouter();
  
    React.useEffect(() => {
       push('/hello-nextjs');
    }, []);
    return <></>;
  };