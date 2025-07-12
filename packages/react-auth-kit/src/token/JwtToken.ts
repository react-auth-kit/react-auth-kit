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

import type IToken from "./IToken";
import AuthKitTokenError from "../error/AuthKitTokenError";

export default class JwtToken implements IToken {
  public getExpiresAt(token: string): Date | never {
    const jwtData = this.parseJwt(token);
    if (Object.prototype.hasOwnProperty.call(jwtData, 'exp')) {
      const d = new Date(0);
      d.setUTCSeconds(jwtData.exp as number);
      return d;
    } else {
      throw new AuthKitTokenError('JWT has no exp param');
    }
  };


  /**
   * Function to parse the JWT
   *
   * @param token - JWT to purse
   * @returns Parsed data from JWT
   */
  private parseJwt = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

    return JSON.parse(jsonPayload);
  };

}
