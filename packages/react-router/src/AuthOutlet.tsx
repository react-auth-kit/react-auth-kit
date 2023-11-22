import * as React from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';

import AuthKitContext from 'react-auth-kit/AuthContext';
import {AuthError} from 'react-auth-kit';
import {isAuthenticated} from 'react-auth-kit/utils/utils';
import {doSignOut} from 'react-auth-kit/utils/reducers';

/**
 * Component Props for Auth Outlet
 */
interface AuthOutletProps {
  /**
   * Path to redirect if the user is not authenticated
   *
   * @example
   * `/login`
   */
  fallbackPath: string
}

/**
 * AuthOutlet provides a easy solution to implement private route solution
 * using react-router-dom route system
 *
 * @example
 *
 * ```jsx
 * function App() {
 *  return (
 *    <Router>
 *      <Routes>
 *        <Route element={<AuthOutlet fallbackPath='/login' />}>
 *          <Route path='/' element={<Users/>} />
 *          <Route path='/products' element={<Products/>} />
 *        </Route>
 *        <Route path='/login' element={<Login/>}/>
 *      </Routes>
 *    </Router>
 *  );
 * }
 * ```
 */
const AuthOutlet : React.FC<AuthOutletProps> = ({fallbackPath}) => {
  const context = React.useContext(AuthKitContext);
  if (context === null) {
    throw new
    AuthError(
        'Auth Provider is missing. ' +
        'Make sure, you are using this component inside the auth provider.',
    );
  }

  if (!isAuthenticated(context.value)) {
    const location = useLocation();
    // Redirect them to the /login page, but save the current location they
    // were trying to go to when they were redirected. This allows us to
    // send them along to that page after they login, which is a nicer
    // user experience than dropping them off on the home page.
    context.set(doSignOut());
    return <Navigate to={fallbackPath} state={{from: location}} replace />;
  }

  return <Outlet />;
};

export default AuthOutlet;
