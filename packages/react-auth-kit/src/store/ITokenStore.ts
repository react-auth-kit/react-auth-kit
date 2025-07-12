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

import {AuthKitState} from "../types";
import {UpdatedAuthKitState} from "./types";

/**
 * ITokenStore is the interface for the store used by React Auth Kit.
 * It provides methods to subscribe to changes, set the state,
 * get the current value, and handle sign-in and sign-out events.
 *
 * @typeParam T - Type of User State Object
 */
export interface ITokenStore<T> {

  /**
   * Subscribe to changes in the AuthKit state.
   *
   * @param next - A callback function that gets called by the producer during
   * the subscription when the producer "has" the `value`. It won't be called
   * if `error` or `complete` callback functions have been called
   *
   * @param error - A callback function that gets called by the producer
   * if and when it encountered a problem of any kind
   *
   * @param complete - A callback function that gets called by the producer
   * if and when it has no more values to provide
   */
  subscribe: (
    next: ((value: AuthKitState<T>) => void),
    error?: ((err: any) => void),
    complete?: (() => void),
  ) => void,

  /**
   * Subscribe to sign-in events.
   * @param callback - Callback function that is called with the new AuthKit state when a user signs in.
   */
  onSignIn: (callback: (value: AuthKitState<T>) => void) => void,

  /**
   * Subscribe to sign-out events.
   * @param callback - Callback function that is called when a user signs out.
   */
  onSignOut: (callback: ()=> void) => void

  /**
   * Set the AuthKit state.
   * @param data - The new AuthKit state to set.
   */
  set: (data: UpdatedAuthKitState<T>) => void

  /**
   * Get the current AuthKit state.
   * @returns The current AuthKit state.
   */
  value: AuthKitState<T>

  /**
   * Sync Auth Tokens on time of login and logout
   *
   * Set the New Cookies or new Localstorage on login
   * Or Remove the old Cookies or old Localstorage on logout
   *
   * @param authState - Current Auth State
   */
  syncTokens: (authState: AuthKitState<T>) => void
}
