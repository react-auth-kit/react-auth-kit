/*
 * Copyright 2025 Arkadip Bhattacharya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use client';

import type React from 'react';

import {AuthKitConfigError} from "../error";
import {refreshTokenCallback} from "./types";


/**
 * Parameter for the Refresh operation
 */
export interface createRefreshAttribute<T> {

  /**
   * Interval on which the callback function is called
   */
  interval: number;

  /**
   * A Callback function which have the network request
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

  /**
   * Initial component to be rendered when the refresh is not yet started
   * or the refresh is in progress.
   *
   * @remarks
   * This component is rendered only once when the refresh is started
   * and not at every refresh interval.
   * This is useful to show a loading spinner or a message
   *
   * @example
   * ```jsx
   * <Spinner />
   * ```
   */
  initialRefreshComponent?: React.ReactNode;
}

type createRefreshResponse<T> = createRefreshAttribute<T>

/**
 * @param param - Parameters required for the refresh engine
 * @returns Same params with added layer of a safety net.
 *
 * @remarks
 * This function doesn't really "do anything" at runtime,
 * it's just helps to organize the code base
 * Use this function to create the refresh token system
 *
 */
function createRefresh<T>(param: createRefreshAttribute<T>)
  :createRefreshResponse<T> {
  if (param.interval < 0) {
    throw new AuthKitConfigError(
        'Refresh interval is a time in seconds and can\'t be a negative(-ve)'+
        ' number. Make sure you are using positive number.',
    );
  }
  return param;
}

export default createRefresh;
