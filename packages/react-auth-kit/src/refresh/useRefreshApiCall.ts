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

import {AuthKitError} from "../error";
import type {createRefreshAttribute} from "./createRefresh";
import {ITokenStore} from "../store";
import Action from "../utils/action";

function useRefreshApiCall<T>(refresh: createRefreshAttribute<T>, store: ITokenStore<T>) {
  return () => {
    refresh.refreshApiCallback({
      authToken: store.value.auth?.token,
      authUserState: store.value.userState,
      refreshToken: store.value.refresh?.token,
    })
      .then((result) => {
        // IF the API call is successful, then refresh the AUTH state
        if (result.isSuccess) {
          // store the new value using the state update
          Action.doRefresh(result, store);
        } else {
          // sign out if failed to refresh
          Action.doSignOut(store);
        }
      })
      .catch(() => {
        // Retry for Future
        Action.doSignOut(store);
        throw new AuthKitError('Some error occurred on the Refresh API. Unable to refresh for now')
      });
  }
}

export {useRefreshApiCall};
