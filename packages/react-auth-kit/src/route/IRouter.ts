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
 * Router Plugin for React Auth Kit
 * It's used to navigate between pages when needed by react-auth-kit
 *
 */
export interface IRouter {
  /**
   * Navigate function
   * @param param0 - object with \{to\} - navigate to param
   */
  navigate: ({to}: { to: string }) => void
  /**
   * Hook to navigate
   * @returns Hook function
   */
  useNavigate: () => ({to}: { to: string }) => void

  /**
   *
   * @returns Current path
   */
  usePath: () => () => string
}
