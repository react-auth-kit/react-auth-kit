'use client';

import React, {JSX} from 'react';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import {UserData} from '@/types';

const Page = (): JSX.Element => {
  const data = useAuthUser<UserData>();
  const signOut = useSignOut();

  const logOutHandler = () => {
    signOut('/');
  };

  return (
    <div>
      <h1>{`The User name is  : ${data?.name}`}</h1>
      <button onClick={logOutHandler}>Log Out</button>
    </div>
  );
};

export default Page;
