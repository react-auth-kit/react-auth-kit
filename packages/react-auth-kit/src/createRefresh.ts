import {AuthError} from './errors';
import type {createRefreshParamInterface} from './types';

/**
 *
 * @remarks
 * This function doesn't really "do anything" at runtime,
 * it's just help to organize the code base
 * Use this function to create the refresh token system
 *
 * @param param - Parameters required for the refresh engine
 * @returns Same params with added layer of safety net.
 */
function createRefresh<T>(param: createRefreshParamInterface<T>)
  :createRefreshParamInterface<T> {
  if (param.interval < 0) {
    throw new AuthError(
        'Refresh interval is a time in seconds and can\'t be a negative(-ve)'+
        ' number. Make sure you are using possitive number.',
    );
  }
  return param;
}

export default createRefresh;
