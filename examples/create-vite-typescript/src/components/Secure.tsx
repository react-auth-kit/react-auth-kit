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


import useSignOut from "react-auth-kit/hooks/useSignOut";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import type {UserState} from "../types.ts";

const Secure = () => {
  const signOut = useSignOut('/login')
  const authUser = useAuthUser<UserState>()
  const authHeader = useAuthHeader();

  const signOutAction = () => {
    signOut()
  }

  return (
    <div>
      <p>{`Hello ${authUser.name}`}</p>
      <p>{`your U-ID is: ${authUser.uid} `} </p>
      <p> {` Auth Header: ${authHeader} `}</p>
      <button onClick={signOutAction}>Sign Out!</button>
    </div>
  )
}

export default Secure;
