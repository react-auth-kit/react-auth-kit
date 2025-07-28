// noinspection JSDeprecatedSymbols

import * as React from 'react';
import {Navigate, Outlet} from 'react-router';

import {AuthKitConfigError} from 'react-auth-kit/error/AuthKitConfigError';
import {useReactAuthKitConfig} from 'react-auth-kit/AuthContext';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';


/**
 * Component Props for Auth Outlet
 */
interface AuthOutletProps {
  /**
   * Path to redirect if the user is not authenticated
   *
   * @deprecated Use AuthProvider fallbackPath prop instead.
   * Will be removed in the upcoming version
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
function AuthOutlet({fallbackPath}: AuthOutletProps): React.ReactNode {
  const isAuthenticated = useIsAuthenticated();
  const config = useReactAuthKitConfig();

  let fp;
  if (fallbackPath !== undefined) {
    fp = fallbackPath;
  } else if (
    config.fallbackPath !== undefined
  ) {
    fp = config.fallbackPath;
  } else {
    throw new AuthKitConfigError(
      'fallbackPath prop must be present'+
      ' in AuthProvider or AuthOutlet component',
    );
  }

  if (!isAuthenticated()) {
    // Redirect them to the /login page but save the current location they
    // were trying to go to when they were redirected. This allows us to
    // send them along to that page after they log in, which is a nicer
    // user experience than dropping them off on the home page.
    return <Navigate to={fp} replace />;
  }

  return <Outlet />;
}

export default AuthOutlet;
