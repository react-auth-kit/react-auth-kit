'use client'

import React, { useState, useEffect } from 'react'
import { SecureData } from '../componants/data'

const page = () => {
  const [mounted, setmounted] = useState(false);
  
  useEffect(() => {
    setmounted(true);
  }, [])

  return mounted && <SecureData/>;
}

export default page