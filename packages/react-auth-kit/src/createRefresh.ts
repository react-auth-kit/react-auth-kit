'use client';

import type React from 'react';

import {BaseAuthKitError} from "./error/BaseAuthKitError";

/**
 * Payload for Refresh token False
 */
type RefreshTokenActionPayloadFalse = {
  /**
   * If the refresh operation is successful or not
   *
   * If the isSuceess is `true`, then the `token` and other items will be
   * replaced with the new network response
   *
   * If the isSuceess is `false`, then everything will be wiped and user will
   * be sgined out
   */
  isSuccess: false
}

/**
 * Payload for Refresh token Success True
 */
export type RefreshTokenActionPayloadTrue<T> = {

  /**
   * New Auth token from the network response
   */
  newAuthToken: string,

  /**
   * New Auth Token type from the network response
   */
  newAuthTokenType?: string,

  /**
   * New Refresh token from the nwtwork response. Can be null
   */
  newRefreshToken?: string,

  /**
   * New User state from the network. Can be null
   */
  newAuthUserState?: T | null,

  /**
   * If the refresh operation is successful or not
   *
   * If the isSuceess is `true`, then the `token` and other items will be
   * replaced with the new network response
   *
   * If the isSuceess is `false`, then everything will be wiped and user will
   * be signed out
   */
  isSuccess: boolean
}

/**
 * Response type by the refrsh token
 */
export type RefreshTokenCallbackResponse<T> = RefreshTokenActionPayloadTrue<T> | RefreshTokenActionPayloadFalse;


/**
 *
 */
type refreshTokenCallback<T> = (param: {

  /**
   * Existing Auth token for the refresh operation
   */
  authToken?: string,

  /**
   * Existing Refresh token for the refresh operation
   */
  refreshToken?: string,

  /**
   * Existing User State for the User state
   */
  authUserState: T | null,
}) => Promise<RefreshTokenCallbackResponse<T>>

/**
 * Parameter for the Refresh operation
 */
export interface createRefreshParamInterface<T> {

  /**
   * Interval on which the callback function is called
   */
  interval: number;

  /**
   * A Callback function which'll have the network request
   *
   * @example
   * ```js
   * refreshApiCallback: async (param) => {
   *  try {
   *    const response = await axios.post("/refresh", param, {
   *      headers: {'Authorization': `Bearer ${param.authToken}`}
   *    })
   *    console.log("Refreshing")
   *    return {
   *      isSuccess: true,
   *      newAuthToken: response.data.token,
   *      newAuthTokenExpireIn: 10,
   *      newRefreshTokenExpiresIn: 60
   *    }
   *  }
   *  catch(error){
   *    console.error(error)
   *    return {
   *      isSuccess: false
   *    }
   *  }
   * }
   * ```
   */
  refreshApiCallback: refreshTokenCallback<T>;

  initalRefreshComponent?: React.ReactNode;
}


/**
 * @param param - Parameters required for the refresh engine
 * @returns Same params with added layer of safety net.
 *
 * @remarks
 * This function doesn't really "do anything" at runtime,
 * it's just help to organize the code base
 * Use this function to create the refresh token system
 *
 */
function createRefresh<T>(param: createRefreshParamInterface<T>)
  :createRefreshParamInterface<T> {
  if (param.interval < 0) {
    throw new BaseAuthKitError(
        'Refresh interval is a time in seconds and can\'t be a negative(-ve)'+
        ' number. Make sure you are using possitive number.',
    );
  }
  return param;
}

export default createRefresh;
