// noinspection JSDeprecatedSymbols

import * as React from 'react';
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
 *          <RequireAuth>
 *            <SecureComponent/>
 *          </RequireAuth>
 *        }/>
 *      </Routes>
 *    </BrowserRouter>
 *  )
 * }
 * ```
 */

function RequireAuth({children}: RequireAuthProps): React.ReactNode {
  useIsAuthenticated();
  return children;
}


export default RequireAuth;
