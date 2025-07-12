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

/**
 * Returns the value if it is defined, otherwise returns the default value.
 * @param value - The value to check.
 * @param defaultValue - The default value to return if the value is undefined.
 *
 * @example
 * ```ts
 * import valueOrDefault from './valueOrDefault';
 * const result = valueOrDefault(someValue, 'default value');
 * // console.log(result); // Outputs 'default value' if someValue is undefined, otherwise outputs someValue
 * ```
 *
 * @typeParam T - The type of the value and default value.
 * @returns The value if it is defined, otherwise the default value.
 */
const valueOrDefault = <T>(value: T | undefined, defaultValue: T): T => {
  return value === undefined ? defaultValue : value;
}

export default valueOrDefault;
