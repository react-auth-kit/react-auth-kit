import * as React from 'react';
import {Navigate} from 'react-router';
import {useReactAuthKit, useReactAuthKitConfig} from 'react-auth-kit/AuthContext';
import {doSignOut} from 'react-auth-kit/utils/reducers';
import {isAuthenticated} from 'react-auth-kit/utils/utils';
import { AuthError } from 'react-auth-kit';

/**
 * Component Props for Require Auth
 */
interface RequireAuthProps {
  /**
   * Children component which will require auth to access
   */
  children: JSX.Element,
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
 *        <Route path={'/'} element={<Home/>}/>
 *        <Route path={'/login' } element={<Login/>}/>
 *        <Route path={'/secure'} element={
 *          <RequireAuth fallbackPath={'/login'}>
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
    const context = useReactAuthKit();
    const config = useReactAuthKitConfig();

    
    let fp;
    if(!fallbackPath && !config.fallbackPath) {
      throw new AuthError("fallbackPath prop must be present in AuthProvider or RequireAuth component")
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

    return children;
  };


export default RequireAuth;
