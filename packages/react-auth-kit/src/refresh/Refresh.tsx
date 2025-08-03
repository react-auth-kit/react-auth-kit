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

import {useEffect, useState, type PropsWithChildren, type ReactNode} from "react";
import type {createRefreshAttribute} from "./createRefresh";
import {useRefreshApiCall} from "./useRefreshApiCall";

import {ITokenStore} from "../store";

import {useInterval} from "../utils/hooks";
import Action from "../utils/action";


interface RefreshProps<T> {
  refresh: createRefreshAttribute<T>
  store: ITokenStore<T>
}

/**
 * Refresh Component
 * This component is responsible for handling the refresh logic of the authentication token.
 * It checks if the user is signed in, and if the refresh token is valid, it will refresh the token.
 * If the user is not signed in or the refresh token is expired, it will sign out the user.
 * It also handles the initial refresh state and periodic refresh calls.
 *
 * @typeParam T - Type of the authentication token
 *
 * @param children - Children components to render when the refresh is not in progress
 * @param refresh - The refresh attribute containing the refresh logic and API callback
 * @param store - The token store that holds the authentication state and methods to update it
 *
 * @returns ReactNode - The rendered component, either the children or the initial refresh component
 *
 * @internal
 */
function Refresh<T>({children, refresh, store}: PropsWithChildren<RefreshProps<T>>): ReactNode {
  const [shouldInitialRefreshState, setShouldInitialRefreshState] = useState<boolean>(store.value.isSignIn);
  const refreshApiCall = useRefreshApiCall(refresh, store);

  const _refresh = () => {
    refreshApiCall()
      .then((data) => {
        if (data !== null) {
          Action.doRefresh(data, store);
        } else {
          Action.doSignOut(store);
        }
        setShouldInitialRefreshState(false);
      })
      .catch((e) => {
        console.error(e);
        Action.doSignOut(store);
      });
  }

  useEffect(() => {
    // Periodic call refresh
    useInterval(
      _refresh,
      store.value.isSignIn ? refresh.interval : null,
    );
  }, [store.value.isSignIn]);

  // Initial Refresh
  useEffect(() => {
    // if(!shouldInitialRefreshState){
    //   return;
    // }

    // Check for Initial condition
    const {value} = store;
    // If everything is okay,
    if (value.isSignIn) {
      // Set refreshing to false
      setShouldInitialRefreshState(false);
    }
    // Else If refresh condition met
    else if (value.isUsingRefreshToken && value.refresh && value.refresh.expiresAt > new Date()) {
      // Refresh the auth token by calling the doRefresh
      _refresh()
    }
    // IF the user is sign out
    else {
      // make a SignOut call
      Action.doSignOut(store);
      setShouldInitialRefreshState(false);
    }
    // Set refreshing to false
  }, [])

  if (shouldInitialRefreshState && refresh.initialRefreshComponent) {
    return refresh.initialRefreshComponent;
  } else {
    return children;
  }
}

export {Refresh};
