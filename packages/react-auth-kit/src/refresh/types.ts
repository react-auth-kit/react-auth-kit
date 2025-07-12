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

/**
 * Payload for Refresh token False
 */
type RefreshTokenActionResponseFailed = {
  /**
   * If the refresh operation is successful or not
   *
   * If the `isSuccess` is `true`, then the `token` and other items will be
   * replaced with the new network response
   *
   * If the isSuccess is `false`, then everything will be wiped and
   * the user will be signed out
   */
  isSuccess: false
}

/**
 * Payload for Refresh token Success True
 */
export type RefreshTokenActionResponsePassed<T> = {

  /**
   * New Auth token from the network response
   */
  newAuthToken: string,

  /**
   * New Auth Token type from the network response
   */
  newAuthTokenType?: string,

  /**
   * New Refresh token from the network response. Can be null
   */
  newRefreshToken?: string,

  /**
   * New User state from the network. Can be null
   */
  newAuthUserState?: T | null,

  /**
   * If the refresh operation is successful or not
   *
   * If the isSuccess is `true`, then the `token` and other items will be
   * replaced with the new network response
   *
   * If the isSuccess is `false`, then everything will be wiped and the user will
   * be signed out
   */
  isSuccess: boolean
}

/**
 * Response type by the refresh token
 */
export type RefreshTokenActionResponse<T> = RefreshTokenActionResponsePassed<T> | RefreshTokenActionResponseFailed;

/**
 * Callback function for the refresh token operation
 *
 * This function is called when the refresh token operation is triggered.
 * It should return a promise which resolves to a `RefreshTokenActionResponse`
 * object.
 *
 * @typeParam T - Type of User State Object
 */
export type refreshTokenCallback<T> = (param: {

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
}) => Promise<RefreshTokenActionResponse<T>>
