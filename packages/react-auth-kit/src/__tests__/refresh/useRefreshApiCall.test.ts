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

import {ITokenStore} from "../../store";
import {RefreshTokenActionResponse, useRefreshApiCall} from "../../refresh";
import {renderHook, waitFor} from "@testing-library/react";
import createRefresh from "../../refresh/createRefresh";

describe('useRefreshApiCall', () => {
  const setFn = jest.fn();

  beforeEach(() => {
    setFn.mockClear();
  });

  const tokenStore: ITokenStore<any> = {
    set: setFn,
    subscribe: jest.fn(),
    value: {
      auth: {
        token: "last time",
        type: "Bearer",
        expiresAt: new Date()
      },
      userState: {
        name: "tester"
      },
      refresh: {
        token: "last refresh token",
        expiresAt: new Date()
      },
      isSignIn: true,
      isUsingRefreshToken: true
    },
    syncTokens: function (): void {
      throw new Error('Function not implemented.');
    }
  }

  it('should call doRefresh Action', async () => {
    const apiFn = jest.fn(
      () => new Promise<RefreshTokenActionResponse<unknown>>((resolve) => {
        setTimeout(resolve, 0, {
          newAuthToken: 'asdf',
          isSuccess: true
        });
      })
    );

    const createRefreshData = createRefresh({
      interval: 10,
      refreshApiCallback: apiFn
    });

    const {result} = renderHook(() => useRefreshApiCall(createRefreshData, tokenStore));
    const res = await result.current()

    await waitFor(() => expect(apiFn).toHaveBeenCalledTimes(1));
    expect(res).not.toBeNull();
    expect(res).toStrictEqual({
      isSuccess: true,
      newAuthToken: "asdf"
    });
  });

  it('should call doSignOut Action', async () => {
    const apiFn = jest.fn(
      () => new Promise<RefreshTokenActionResponse<unknown>>((resolve) => {
        setTimeout(resolve, 0, {
          newAuthToken: 'asdf',
          isSuccess: false
        });
      })
    );

    const createRefreshData = createRefresh({
      interval: 10,
      refreshApiCallback: apiFn
    });

    const {result} = renderHook(() => useRefreshApiCall(createRefreshData, tokenStore));
    const res = await result.current()

    await waitFor(() => expect(apiFn).toHaveBeenCalledTimes(1));
    expect(res).toBeNull();
  });

  it('should call doSignOut Action and throw error', async () => {
    const apiFn = jest.fn(
      () => new Promise<RefreshTokenActionResponse<unknown>>((_resolve, reject) => {
        setTimeout(reject, 0, new Error("Unknow error occurred")
        );
      })
    );

    const createRefreshData = createRefresh({
      interval: 10,
      refreshApiCallback: apiFn
    });

    const {result} = renderHook(() => useRefreshApiCall(createRefreshData, tokenStore));
    await expect(result.current())
      .rejects
      .toThrow(Error);

    await waitFor(() => expect(apiFn).toHaveBeenCalledTimes(1));
  });
});
