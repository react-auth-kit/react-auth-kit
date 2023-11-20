import * as React from 'react';
import {useLocation, Navigate} from 'react-router-dom';
import AuthContext from 'react-auth-kit/AuthContext';
import {doSignOut} from 'react-auth-kit/utils/reducers';
import {AuthError} from 'react-auth-kit/errors';
import {isAuthenticated} from 'react-auth-kit/utils/utils';

interface RequireAuthProps {
  children: JSX.Element,
  loginPath: string
}

/**
 * Private Route for Components
 *
 * @remarks
 * This Component is based on {@link https://reactrouter.com/web/api/Route | reactrouter.Route}.
 * So you need to install react-route-dom before use it
 *
 * @param props
 */

const RequireAuth: React.FunctionComponent<RequireAuthProps> =
  ({children, loginPath}) => {
    const context = React.useContext(AuthContext);
    if (context === null) {
      throw new
      AuthError('Auth Provider is missing. ' +
      'Please add the AuthProvider before Router');
    }

    const location = useLocation();

    if (!isAuthenticated(context.value)) {
      // Redirect them to the /login page, but save the current location they
      // were trying to go to when they were redirected. This allows us to
      // send them along to that page after they login, which is a nicer
      // user experience than dropping them off on the home page.
      context.set(doSignOut());
      return <Navigate to={loginPath} state={{from: location}} replace />;
    }

    return children;
  };


export default RequireAuth;
