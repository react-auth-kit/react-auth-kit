'use client';

import React from 'react';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import {useRouter} from 'next/navigation';
import {UserData} from '@/types';

const Page = () => {
  const isAuthenticated = useIsAuthenticated();
  const signIn = useSignIn<UserData>();
  const {push} = useRouter();

  /**
   * Login Handle, the callback function onClick from the "Login" button
   *
   * This function demostrate a fake authentication, using useSignIn function
   */
  const loginHandler = () => {
    // Assuming that, all network Request is successfull,
    // and the user is authenticated

    signIn({
      auth: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3'+
        'ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxNzEyMDYxNTQwfQ.YdSeW9BKM'+
        'ykgD__a2LnfoVr9ZtFEhgXPA0CZwUfbEes',
      },
      userState: {name: 'Manas Baroi', uid: '123456', email: 'manas@abc.com'},
      navigateTo: '/secure',
    });
  };
  console.log(isAuthenticated());
  if (isAuthenticated()) {
    // If authenticated user, then redirect to secure dashboard

    push('/secure');
    return <></>;
  } else {
    // If not authenticated, use the login flow
    // For Demostration; I'm using just a button to log in.
    // In reality, there should be a form, validation,
    // netowrk request and other things
    return (
      <div>
        <button onClick={loginHandler}>Log In!!</button>
      </div>

    );
  }
};

export default Page;
