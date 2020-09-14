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

import AuthProvider from './AuthProvider'
import PrivateRoute from './PrivateRoute'
import useSignIn from './hooks/useSignIn'
import useSignOut from './hooks/useSignOut'
import useAuthUser from './hooks/useAuthUser'
import useAuthHeader from './hooks/useAuthHeader'
import useIsAuthenticated from './hooks/useIsAuthenticated'
import withSignIn from './higherOrderComponents/withSignIn'
import withSignOut from './higherOrderComponents/withSignOut'
import withAuthUser from './higherOrderComponents/withAuthUser'
import withAuthHeader from './higherOrderComponents/withAuthHeader'
import withIsAuthenticated from './higherOrderComponents/withIsAuthenticated'

export {
  AuthProvider,
  PrivateRoute,
  useSignIn,
  useSignOut,
  useAuthUser,
  useAuthHeader,
  useIsAuthenticated,
  withSignIn,
  withSignOut,
  withAuthUser,
  withAuthHeader,
  withIsAuthenticated
}
