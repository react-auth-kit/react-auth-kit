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

import valueOrDefault from "../../utils/valueOrDefault";

describe('ValueOrDefault', () => {
  it('Returns default value when input is undefined', () => {
    const result = valueOrDefault(undefined, 'default');
    expect(result).toBe('default');
  });

  it('Returns input value when it is defined', () => {
    const result = valueOrDefault('input', 'default');
    expect(result).toBe('input');
  });

  it('Handles null as input', () => {
    const result = valueOrDefault(null, 'default');
    expect(result).toBe(null);
  });

  it('Handles empty string as input', () => {
    const result = valueOrDefault('', 'default');
    expect(result).toBe('');
  });
});
