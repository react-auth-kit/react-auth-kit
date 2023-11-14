
import {useContext} from 'react';
import AuthContext from '../AuthContext';
import {AuthError} from '../errors';
import {isAuthenticated} from '../utils/utils';


function useIsAuthenticated(): ()=>boolean {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new
    AuthError(
      'Auth Provider is missing. ' +
      'Make sure, you are using this hook inside the auth provider.'
    );
  }
  return () => {
    if (!isAuthenticated(context.value)) {
      return false;
    } else {
      return true;
    }
  };
}

export default useIsAuthenticated;
