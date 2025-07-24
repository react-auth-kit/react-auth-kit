// noinspection JSDeprecatedSymbols

import * as React from 'react';
import {Navigate} from 'react-router';

import {AuthKitConfigError} from 'react-auth-kit/error/AuthKitConfigError';
import {useReactAuthKitConfig} from 'react-auth-kit/AuthContext';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import {type ReactNode} from "react";

/**
 * Component Props for Require Auth
 */
interface RequireAuthProps {
  /**
   * Children component which will require auth to access
   */
  children: ReactNode,
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
 * RequireAuth provides a solution for implementing auth on per-component basis
 * for private route solutions using the react-router-dom route system
 *
 * @example
 *
 * ```jsx
 * const RoutesComponent = () => {
 *  return (
 *    <BrowserRouter>
 *      <Routes>
 *        <Route path={"/"} element={<Home/>}/>
 *        <Route path={"/login"} element={<Login/>}/>
 *        <Route path={"/secure"} element={
 *          <RequireAuth fallbackPath={"/login"}>
 *            <SecureComponent/>
 *          </RequireAuth>
 *        }/>
 *      </Routes>
 *    </BrowserRouter>
 *  )
 * }
 * ```
 */
const RequireAuth: React.FC<RequireAuthProps> =
  ({children, fallbackPath}) => {
    const config = useReactAuthKitConfig();
    const isAuthenticated = useIsAuthenticated();

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
        ' in AuthProvider or RequireAuth component',
      );
    }


    if (!isAuthenticated()) {
      // Redirect them to the /login page but save the current location they
      // were trying to go to when they were redirected. This allows us to
      // send them along to that page after they log in, which is a nicer
      // user experience than dropping them off on the home page.

      return <Navigate to={fp} replace />;
    }

    return children;
  };


export default RequireAuth;
