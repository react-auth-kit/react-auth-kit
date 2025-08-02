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

import type {createRefreshAttribute} from "./createRefresh";
import {ITokenStore} from "../store";
import {RefreshTokenActionResponsePassed} from "./types";

function useRefreshApiCall<T>(refresh: createRefreshAttribute<T>, store: ITokenStore<T>): () => Promise<RefreshTokenActionResponsePassed<T> | null> {
  return async (): Promise<RefreshTokenActionResponsePassed<T> | null> => {
    return refresh.refreshApiCallback({
      refreshToken: store.value.refresh?.token,
    })
      .then((result) => {
        // IF the API call is successful, then refresh the AUTH state
        if (result.isSuccess) {
          // store the new value using the state update
          return new Promise<RefreshTokenActionResponsePassed<T>>((resolve) => {
            resolve(result);
          });
        } else {
          // sign out if failed to refresh
          return new Promise<null>((resolve) => {
            resolve(null);
          });
        }
      })
      .catch((e) => {
        // Retry for Future
        return new Promise<null>((_resolve, reject) => {
          reject(e);
        })
      });
  }
}

export {useRefreshApiCall};
