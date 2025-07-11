import {useEffect, useState, type PropsWithChildren, type ReactNode } from "react";
import type { createRefreshParamInterface } from "./createRefresh";
import type TokenObject from "./RxTokenObject";

import { useInterval } from "./utils/hooks";
import { doRefresh, doSignOut } from "./utils/reducers";

import {BaseAuthKitError} from "./error/BaseAuthKitError";

interface RefreshProps<T> {
    refresh: createRefreshParamInterface<T>
    store: TokenObject<T>
}

/**
 * React Component
 * Refresh Feature
 *
 * Initial Refresh and Pariodic Refresh
 *
 * @internal
 *
 * @param param0 - Parameters
 * @returns React Functional Component with Refresh Implementation
 */
function Refresh<T>({children, refresh, store}: PropsWithChildren<RefreshProps<T>>): ReactNode {
    const [initialRefreshing, setInitialRefreshing] = useState<boolean>(true);

    /**
     * Refresh API calling
     */
    const refreshApiCall = () => {
      refresh.refreshApiCallback({
        authToken: store.value.auth?.token,
        authUserState: store.value.userState,
        refreshToken: store.value.refresh?.token,
      })
      .then((result) => {
        // IF the API call is successful then refresh the AUTH state
        if (result.isSuccess) {
          // store the new value using the state update
          store.set(doRefresh(result));
        } else {
          // signout if failed to refresh
          store.set(doSignOut());
        }
      })
      .catch(() => {
        // Retry for Future
        store.set(doSignOut());
        throw new BaseAuthKitError('Some error occured on the Refresh API. Unable to refresh for now')
      });
    }

    // Initial Refresh
    useEffect(()=>{
      if(!initialRefreshing){
        return;
      }

      // Check for Initial condition
      const {value} = store;
      // If everything is okay,
      if(value.isSignIn){
        // Set refreshing to false
        setInitialRefreshing(false);
      }
      // Else If refresh condition met
      else if(value.isUsingRefreshToken && value.refresh && value.refresh.expiresAt > new Date()){
        // Refresh the auth token by calling the doRefresh
        refreshApiCall();
        setInitialRefreshing(false);
      }
      // IF the user is sign out
      else {
        // make a SignOut call

        store.set(doSignOut());
        setInitialRefreshing(false);
      }
      // Set refreshing to false
    }, [])

    // Pariodically refresh
    useInterval(
      refreshApiCall,
      store.value.isSignIn ? refresh.interval : null,
    );

    if(initialRefreshing && refresh.initalRefreshComponent){
      return refresh.initalRefreshComponent;
    } else {
      return children;
    }
}

export default Refresh;
