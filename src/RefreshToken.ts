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

import {AuthContextInterface} from "./types";

class RefreshToken{
  private context: AuthContextInterface;

  constructor(context:AuthContextInterface) {
    this.context = context
  }

  /**
   * Get the Current Auth State
   * @returns a object with {authstate: The Auth Token, authTokenType: type of auth token, expireAt: expire time}
   */
  getCurrentAuthState(): {authToken: string|null, authTokenType: string|null, expireAt:Date|null}{
    return {
      authToken: this.context.authState.authTokenType,
      authTokenType: this.context.authState.authToken,
      expireAt: this.context.authState.expireAt
    }
  }

  /**
   * Get the Current User State
   * @returns User State {object}
   */
  getCurrentUserState(): object|null{
    return this.context.authState.authState
  }

  /**
   * updates the AuthState
   * @param authToken - The Updated authToken
   * @param authTokenType - The updated authType (optional)
   * @param expiresIn - The updated expiresIn in minutes. (optional)
   *
   * If the new authToken has different expire time, then you must have to update the expiresIn param
   */
  updateAuthState(authToken: string, authTokenType?: string, expiresIn?: number){
    const o = {authToken: authToken}

    if(authTokenType !== undefined){
      Object.assign(o, {authTokenType: authTokenType})
    }

    if (expiresIn !== undefined){
      const expireAt = new Date(new Date().getTime() + expiresIn * 60 * 1000)
      Object.assign(o, {expireAt: expireAt})
    }

    this.context.setAuthState((prevState)=> ({...prevState, ...o}))
  }

  /**
   * Updates the Auth User's state
   * @param userState
   */
  updateUserState(userState: object){
    this.context.setAuthState((prevState)=>
      ({...prevState, authState: userState}))
  }
}

export default RefreshToken
