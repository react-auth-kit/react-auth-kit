import * as React from 'react';
import {Navigate} from 'react-router';
import AuthContext from 'react-auth-kit/AuthContext';
import {doSignOut} from 'react-auth-kit/utils/reducers';
import {AuthError} from 'react-auth-kit/errors';
import {isAuthenticated} from 'react-auth-kit/utils/utils';

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
   * @example
   * `/login`
   */
  fallbackPath: string
}

/**
 * RequireAuth provides a solution for implementing auth on per per-component basis
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
    const context = React.useContext(AuthContext);
    if (context === null) {
      throw new
      AuthError(
          'Auth Provider is missing. ' +
          'Make sure, you are using this component inside the auth provider.',
      );
    }

    // TODO: needed fallbackPath check

    if (!isAuthenticated(context.value)) {
      // Redirect them to the /login page, but save the current location they
      // were trying to go to when they were redirected. This allows us to
      // send them along to that page after they login, which is a nicer
      // user experience than dropping them off on the home page.
      context.set(doSignOut());
      return <Navigate to={fallbackPath} replace />;
    }

    return children;
  };


export default RequireAuth;
