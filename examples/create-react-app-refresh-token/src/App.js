import React from 'react';
import AuthProvider from 'react-auth-kit'
import RoutesComponent from './Routes';
import refreshApi from "./refreshApi";
import createStore from 'react-auth-kit/createStore';
import ReactRouterPlugin from '@auth-kit/react-router/route';


const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
  refresh: refreshApi
})

function App() {
  return (
    <AuthProvider store={store} router={ReactRouterPlugin} fallbackPath='/login'>
      <RoutesComponent/>
    </AuthProvider>
  );
}

export default App;