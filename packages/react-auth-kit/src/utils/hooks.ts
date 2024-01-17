'use client';

import {useRef, useEffect} from 'react';
import type {MutableRefObject} from 'react';


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
  : MutableRefObject<number | null> {
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

export {useInterval};
