import './App.css'
import RoutesPage from './RoutesPage'
import AuthProvider from 'react-auth-kit'
import createStore from 'react-auth-kit/createStore';
import ReactRouterPlugin from '@auth-kit/react-router/route'

const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
})

function App() {
  return (
    <>
      <AuthProvider store={store} router={ReactRouterPlugin} fallbackPath='/login'>
        <RoutesPage/>
      </AuthProvider>
    </>
  )
}

export default App
