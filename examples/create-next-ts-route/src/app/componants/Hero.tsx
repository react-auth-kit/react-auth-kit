import React from 'react'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className='flex justify-center bg-black md:bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 h-screen items-center'>
      <div className="p-8 rounded-md sm:border">
        <Link href="/login">
          <button type='submit' className='p-2 my-4 mx-2 rounded-md bg-green-700 hover:bg-green-900 text-white' >Go to Login</button>
        </Link>
        <Link href="/secure">
          <button type='submit' className='p-2 rounded-md bg-red-500 hover:bg-red-700 text-white' >Go to Secure Dashboard</button>
        </Link>
      </div>
    </div>
  )
}

export default Hero