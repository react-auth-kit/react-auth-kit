import React from 'react';
import {AuthProvider} from 'react-auth-kit'
import RoutesComponent from './Routes';

function App() {
  return (
    <AuthProvider
      authName={"_auth"} authType={"cookie"}
    >
      <RoutesComponent/>
    </AuthProvider>
  );
}

export default App;
