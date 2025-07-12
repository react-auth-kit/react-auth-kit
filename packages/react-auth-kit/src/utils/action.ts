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

import type {SignInActionPayload} from "../types";
import {ITokenStore} from "../store";
import type {RefreshTokenActionResponsePassed} from "../refresh";
import type {AuthKitSetState} from "../RxTokenObject";

class Action {
  /**
   * Perform Sign In Action
   * This method is used to set the authentication state in the store.
   * It updates the authentication token, type, refresh token, and user state.
   *
   * @typeParam T - Type of the user state
   * @param signInParams - The parameters required for signing in, including the authentication token, type, refresh token, and user state.
   * @param store - The token store where the authentication state will be saved.
   */
  static doSignIn<T>(
    signInParams: SignInActionPayload<T>,
    store: ITokenStore<T>
  ) : void {
    const authType = signInParams.auth.type || 'Bearer';
    const authToken = signInParams.auth.token;

    store.set({
      auth: {
        token: authToken,
        type: authType,
      },
      refresh: signInParams.refresh,
      userState: signInParams.userState || {} as T,
    });
  }

  /**
   * Perform Refresh Token Action
   * This method is used to refresh the authentication token and update the store.
   * It updates the authentication token, type, refresh token, and user state.
   *
   *
   * @remarks
   *
   * Here is the internal decision graph
   * ```
   * refreshTokenParam
   *    |
   *    |-- new auth token --------------------> Update the auth data
   *    |              |
   *    |              |
   *    |              |-- new user state -----> Add user state in
   *    |              |                         the updated auth data
   *    |              |
   *    |              |-- new refresh token --> Add new refresh token in
   *    |                                        the updated auth state
   *    |
   *    |-- No auth token  -------> Update the refresh token
   *    |   only refresh token
   *    |
   *    |
   *    --- No auth token and --------> Make everything Null
   *        refresh token
   * ```
   * @typeParam T - Type of the user state
   * @param refreshTokenParam - The parameters required for refreshing the token, including the new authentication token, type, refresh token, and user state.
   * @param store - The token store where the refreshed authentication state will be saved.
   */
  static doRefresh<T>(refreshTokenParam: RefreshTokenActionResponsePassed<T>, store: ITokenStore<T>): void {
    let ret : AuthKitSetState<T>= {
      auth: {
        token: refreshTokenParam.newAuthToken,
        type: refreshTokenParam.newAuthTokenType || 'Bearer',
      },
    };
    if (refreshTokenParam.newAuthUserState) {
      ret = {
        ...ret,
        userState: refreshTokenParam.newAuthUserState,
      };
    }
    if (refreshTokenParam.newRefreshToken) {
      ret = {
        ...ret,
        refresh: refreshTokenParam.newRefreshToken,
      };
    }
    store.set(ret);
  }

  /**
   * Perform Sign Out Action
   * This method is used to clear the authentication state in the store.
   * It sets the authentication state to null, effectively signing out the user.
   *
   * @typeParam T - Type of the user state
   * @returns An object representing the new authentication state after signing out.
   */
  static doSignOut<T>(store: ITokenStore<T>): void {
    store.set({
      auth: null,
    });
  }
}

export default Action;
