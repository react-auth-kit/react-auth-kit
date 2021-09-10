/*
 * Copyright 2020 Arkadip Bhattacharya
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

import * as React from 'react';
import {refreshTokenCallback} from '../types';

/**
 * React useInterval Hook
 * Used to integrate the power of setInterval seamlessly
 *
 * @param callback - The callback function
 * @param delay - The amount of delay.
 *
 * @returns the ref of setInterval
 */
function useInterval(callback:refreshTokenCallback, delay:number|null)
  :React.MutableRefObject<number | null> {
  const timeoutRef = React.useRef<number | null>(null);
  const savedCallback = React.useRef<refreshTokenCallback>(callback);

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    if (typeof delay === 'number') {
      timeoutRef.current = window.setInterval(savedCallback.current, delay);
    }
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [delay]);

  return timeoutRef;
}

export {useInterval};
