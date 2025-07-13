'use client';

import {useRef, useEffect, RefObject} from 'react';
import {useReactAuthKitRouter} from "../AuthContext";


/**
 * @internal
 *
 * React Hook to use the `setInterval` in the component
 *
 * @param callback - The function that will be called on each interval
 * @param delay - The delay on which the callback function is called
 * @returns - The Reference of the `setInterval` function
 */
function useInterval(callback: ()=>void, delay:number|null)
  : RefObject<number | null> {
  const savedCallback = useRef(callback);
  const intervalRef = useRef<number | null>(null);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => savedCallback.current();

    if (typeof delay === 'number') {
      intervalRef.current = window.setInterval(tick, delay * 60 * 1000);
    }

    return () => {
      if (intervalRef.current) {
        window.clearTimeout(intervalRef.current);
      }
    };
  }, [delay]);

  return intervalRef;
}

/**
 * @internal
 *
 * React Hook to navigate to a specific path using the router plugin
 *
 * @returns - A function that navigates to the specified path
 *
 * @throws Error if the router plugin is not implemented in the AuthProvider
 */
function useNavigateTo(): (to: string) => void {
  const router = useReactAuthKitRouter();
  const navigate = router ? router.useNavigate() : null;

  /**
   * Navigate to a specific path
   *
   * @param to - The path to navigate to
   * @throws Error if the router plugin is not implemented in the AuthProvider
   */
  return (to: string) => {
    if (router && navigate) {
      navigate({to});
    } else {
      throw new Error(
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

export {useInterval, useNavigateTo, useTryNavigateTo};
