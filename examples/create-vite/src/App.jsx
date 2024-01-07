import './App.css'
import RoutesPage from './routesPage'
import AuthProvider from 'react-auth-kit'
import createStore from 'react-auth-kit/createStore';

const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
})

function App() {
  return (
    <>
      <AuthProvider store={store}>
        <RoutesPage/>
      </AuthProvider>
    </>
  )
}

export default App
