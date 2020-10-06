/**
  * @author Arkadip Bhattacharya <in2arkadipb13@gmail.com>
  * @fileoverview Auth User
  * @copyright Arkadip Bhattacharya 2020
  * @license Apache-2.0
  */

import * as React from 'react';
import {AuthContext} from '../AuthProvider';

/**
  * @function 
  * @name useAuthUser 
  * @description Auth State Hook
  * @returns - Auth State Function
  */
function useAuthUser(): () => object | null{
  const c = React.useContext(AuthContext);

  return () => {
    return c.authState.authState;
  };
}

/**
  * @exports useAuthUser
  */
export default useAuthUser;
