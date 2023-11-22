import * as React from 'react';
import {useLocation, Navigate} from 'react-router-dom';
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
 * RequireAuth provides solution for implement auth on per component basis
 * for private route solution
 * using react-router-dom route system
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

    if (!isAuthenticated(context.value)) {
      const location = useLocation();
      // Redirect them to the /login page, but save the current location they
      // were trying to go to when they were redirected. This allows us to
      // send them along to that page after they login, which is a nicer
      // user experience than dropping them off on the home page.
      context.set(doSignOut());
      return <Navigate to={fallbackPath} state={{from: location}} replace />;
    }

    return children;
  };


export default RequireAuth;
