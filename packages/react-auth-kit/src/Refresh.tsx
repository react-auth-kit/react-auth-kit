import {useEffect, useState, type PropsWithChildren, type ReactNode } from "react";
import type { createRefreshParamInterface } from "./createRefresh";
import type TokenObject from "./RxTokenObject";

import { useInterval } from "./utils/hooks";
import { doRefresh, doSignOut } from "./utils/reducers";

interface RefreshProps<T> {
    refresh: createRefreshParamInterface<T> 
    store: TokenObject<T>
}


function Refresh<T>({children, refresh, store}: PropsWithChildren<RefreshProps<T>>): ReactNode {
    const [initialRefreshing, setInitialRefreshing] = useState<boolean>(true);

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
        });
      }
      // Else
      else {
        // make a SignOut call
        store.set(doSignOut());
      }
      // Set refreshing to false
      setInitialRefreshing(false);
    }, [])

    useInterval(
      () => {
        refresh
          .refreshApiCallback({
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
          });
      },
      store.value.isSignIn ? refresh.interval : null,
    );

    if(initialRefreshing && refresh.initalRefreshComponent){
      return refresh.initalRefreshComponent;
    } else {
      return children;
    }
}

export default Refresh;
