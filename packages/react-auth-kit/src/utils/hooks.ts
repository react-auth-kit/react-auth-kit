'use client';

import {useRef, useEffect, useLayoutEffect} from 'react';
import {useReactAuthKitRouter} from "../AuthContext";
import {AuthKitError} from "../error";
import {ITokenStore} from "../store";


/**
 * Custom hook that uses either `useLayoutEffect` or `useEffect` based on the environment (client-side or server-side).
 * @param {Function} effect - The effect function to be executed.
 * @param {Array<any>} [dependencies] - An array of dependencies for the effect (optional).
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect)
 * @example
 * ```tsx
 * useIsomorphicLayoutEffect(() => {
 *   // Code to be executed during the layout phase on the client side
 * }, [dependency1, dependency2]);
 * ```
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * @internal
 *
 * React Hook to use the `setInterval` in the component
 *
 * @param callback - The function that will be called on each interval
 * @param delay - The delay on which the callback function is called
 * @returns - The Reference of the `setInterval` function
 */
function useInterval(callback: ()=>void, delay:number|null) {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (delay === null) {
      return
    }

    const id = setInterval(() => {
      savedCallback.current()
    }, delay)

    return () => {
      clearInterval(id)
    }
  }, [delay])
}


function useIntervalRefresh<T>(callback: () => void, store: ITokenStore<T>, interval: number){
  let intervalId: string | number | NodeJS.Timeout | undefined;

  store.subscribe((state) => {
    if (state.isSignIn) {
      // Clear any existing interval
      if (intervalId) {
        clearInterval(intervalId);
      }
      // Set a new interval
      intervalId = setInterval(() => {
        callback();
      }, interval);
    } else {
      // Clear the interval if not signed in
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = undefined;
      }
    }
  })
}

/**
 * @internal
 *
 * React Hook to navigate to a specific path using the router plugin
 *
 * @returns - A function that navigates to the specified path
 *
 * @throws AuthKitError if the router plugin is not implemented in the AuthProvider
 */
function useNavigateTo(): (to: string) => void {
  const router = useReactAuthKitRouter();
  const navigate = router ? router.useNavigate() : null;

  /**
   * Navigate to a specific path
   *
   * @param to - The path to navigate to
   * @throws AuthKitError if the router plugin is not implemented in the AuthProvider
   */
  return (to: string) => {
    if (router && navigate) {
      navigate({to});
    } else {
      throw new AuthKitError(
        'Router Plugin is not implemented in the AuthProvider. Please use the router prop of AuthProvider and Router plugin to use this feature',
      );
    }
  };
}

/**
 * @internal
 *
 * React Hook to navigate to a specific path if the path is defined
 *
 * @returns - A function that navigates to the specified path if it is defined
 */
function useTryNavigateTo() {
  const navigateTo = useNavigateTo();

  return (to: string | undefined | null): void => {
    if (to) {
      navigateTo(to);
    }
  };
}

export {useInterval, useNavigateTo, useTryNavigateTo, useIntervalRefresh};
