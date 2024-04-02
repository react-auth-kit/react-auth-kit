import * as React from 'react';
import {Navigate, Outlet} from 'react-router';

import {useReactAuthKit, useReactAuthKitConfig} from 'react-auth-kit/AuthContext';
import {isAuthenticated} from 'react-auth-kit/utils/utils';
import {doSignOut} from 'react-auth-kit/utils/reducers';
import { AuthError } from 'react-auth-kit';

/**
 * Component Props for Auth Outlet
 */
interface AuthOutletProps {
  /**
   * Path to redirect if the user is not authenticated
   *
   * @deprecated Use AuthProvider fallpackPath prop instead. Will be removed in the upcoming version
   * @example
   * `/login`
   */
  fallbackPath?: string
}

/**
 * AuthOutlet provides an easy solution to implement private
 * route solutions using the react-router-dom route system
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
  const context = useReactAuthKit();
  const config = useReactAuthKitConfig();

  let fp;
  if(!fallbackPath && !config.fallbackPath) {
    throw new AuthError("fallbackPath prop must be present in AuthProvider or AuthOutlet component")
  } else if (fallbackPath) {
    fp = fallbackPath
  } else {
    fp = config.fallbackPath || ''
  }

  if (!isAuthenticated(context.value)) {
    // Redirect them to the /login page, but save the current location they
    // were trying to go to when they were redirected. This allows us to
    // send them along to that page after they login, which is a nicer
    // user experience than dropping them off on the home page.
    context.set(doSignOut());
    return <Navigate to={fp} replace />;
  }

  return <Outlet />;
};

export default AuthOutlet;
