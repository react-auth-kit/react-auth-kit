import React from 'react';
import {AuthProvider} from 'react-auth-kit'
import Routes from './Routes';

function App() {
  return (
    <AuthProvider
      authName={"_auth"} authType={"cookie"}
    >
      <Routes/>
    </AuthProvider>
  );
}

export default App;
