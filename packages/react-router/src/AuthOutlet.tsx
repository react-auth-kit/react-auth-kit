import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom'

import AuthKitContext from 'react-auth-kit/AuthContext';
import { AuthError } from 'react-auth-kit';
import { isAuthenticated } from 'react-auth-kit/utils/utils';

/**
 * 
 */
interface AuthOutletProps {
  /**
   * 
   */
  loginPath: string
}

/**
 * 
 * @returns React Functional Component for auth usage
 */
const AuthOutlet : React.FC<AuthOutletProps> = ({ loginPath }) => {
  const context = React.useContext(AuthKitContext);
  if (context === null) {
    throw new
      AuthError(
        'Auth Provider is missing. ' +
        'Make sure, you are using this component inside the auth provider.'
      );
  }

  return (
    isAuthenticated(context.value) ? <Outlet /> : <Navigate to={loginPath} replace />
  )
}

export default AuthOutlet;