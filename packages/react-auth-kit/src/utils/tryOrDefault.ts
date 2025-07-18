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

class TryOrDefault {
  static func = <T, A extends any[]>(func: (...args: A) => T, defaultValue: T, ...args: A): T => {
    try {
      // Attempt to call the function with the provided arguments
      return func(...args);
    }
    catch (e) {
      // If an error occurs during the function call, log the error (optional)
      console.error(`${func.name} Function call failed, returning default value:`, e);
      // Return the specified default value
      return defaultValue;
    }
  }

  static method = <T, A extends any[]>(func: (...args: A) => T, thisArg: any, defaultValue: T, ...args: A): T => {
    try {
      // Attempt to call the function with the provided arguments
      return func.apply(thisArg, args);
    }
    catch (e) {
      // If an error occurs during the function call, log the error (optional)
      console.warn(`${func.name} Function call failed, returning default value:`, e);
      // Return the specified default value
      return defaultValue;
    }
  }
}

export default TryOrDefault;
