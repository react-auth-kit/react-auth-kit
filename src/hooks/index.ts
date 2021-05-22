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

import useAuth from './useAuth';
import useSignIn from './useSignIn';
import useSignOut from './useSignOut';
import useAuthUser from './useAuthUser';
import useAuthHeader from './useAuthHeader';
import useRefreshToken from './useRefreshToken';
import useIsAuthenticated from './useIsAuthenticated';

export {
  useAuth,
  useSignIn,
  useSignOut,
  useAuthHeader,
  useAuthUser,
  useRefreshToken,
  useIsAuthenticated,
};
