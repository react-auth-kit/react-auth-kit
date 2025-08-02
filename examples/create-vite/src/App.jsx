import RouteComponent from './RouteComponent'
import AuthProvider from 'react-auth-kit'
import createAuthStore from 'react-auth-kit/store/createAuthStore';
import ReactRouterPlugin from '@auth-kit/react-router/route'
import { BrowserRouter } from 'react-router-dom';
import refreshApi from './refresh/refresh.jsx'

const store = createAuthStore("localstorage", {
  authName:'_auth',
  refresh: refreshApi,
  debug: true,
});

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider store={store} router={ReactRouterPlugin} fallbackPath='/login'>
          <RouteComponent/>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App;
