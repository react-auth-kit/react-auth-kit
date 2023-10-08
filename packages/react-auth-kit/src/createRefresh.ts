/**
 * 
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview Refresh Token engine
 * @copyright Arkadip Bhattacharya 2020
 *
 */


import {createRefreshParamInterface} from './types';

/**
 * This function doesn't really "do anything" at runtime,
 * it's just help to organize the code base
 * Use this function to create the refresh token system
 */
function createRefresh(param: createRefreshParamInterface)
  :createRefreshParamInterface {
  return param;
}

export default createRefresh;
