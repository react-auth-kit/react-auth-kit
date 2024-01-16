'use client'

import React from 'react'
import { SecureData } from '../componants/data'
import { useAuth } from '@auth-kit/next/useAuth';

const page = () => {
  useAuth({ fallbackPath: '/login', });

  // const [mounted, setmounted] = useState(false);
  
  // useEffect(() => {
  //   setmounted(true);
  // }, [])

  return <SecureData/>;
}

export default page