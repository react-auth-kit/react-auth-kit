import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <div>
      <Link href="/login">
        <button type='submit'>Go to Login</button>
      </Link>
      <Link href="/secure">
        <button type='submit'>Go to Secure Dashboard</button>
      </Link>
    </div>
  );
};

export default Hero;
