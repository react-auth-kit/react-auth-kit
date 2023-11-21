import * as React from 'react';
import {useLocation, Navigate} from 'react-router-dom';
import AuthContext from 'react-auth-kit/AuthContext';
import {doSignOut} from 'react-auth-kit/utils/reducers';
import {AuthError} from 'react-auth-kit/errors';
import {isAuthenticated} from 'react-auth-kit/utils/utils';

/**
 * 
 */
interface RequireAuthProps {
  /**
   * 
   */
  children: JSX.Element,
  /**
   * 
   */
  loginPath: string
}

/**
 * 
 * @returns 
 */
const RequireAuth: React.FC<RequireAuthProps> =
  ({children, loginPath}) => {
    const context = React.useContext(AuthContext);
    if (context === null) {
      throw new
      AuthError(
        'Auth Provider is missing. ' +
        'Make sure, you are using this component inside the auth provider.'
      );
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
