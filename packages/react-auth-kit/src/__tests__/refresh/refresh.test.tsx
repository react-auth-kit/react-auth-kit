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

// @ts-ignore
import Cookies from "js-cookie";
import {act, render, waitFor} from "@testing-library/react";

import {Refresh, RefreshTokenActionResponse} from "../../refresh";

import createAuthStore from "../../store";
import Action from "../../utils/action";
import createRefresh from "../../refresh/createRefresh";

jest.useFakeTimers()

const doSignOutSpy = jest.spyOn(Action, 'doSignOut');
const doRefreshSpy = jest.spyOn(Action, 'doRefresh');

describe("Initial Refresh", () => {
	const InitialRefreshComponent = () => (
		<div>
			This is the initial Refresh
		</div>
	)

	afterEach(() => {
		Cookies.remove('___auth');
		Cookies.remove('___auth_type');
		Cookies.remove('___state');
		Cookies.remove('___refresh');
		doRefreshSpy.mockClear();
		doSignOutSpy.mockClear();
	});

	it('should not refresh, If all tokens are present', () => {
		Cookies.set('___auth_type', 'Bearer');
    Cookies.set('___state', '{}');
		const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
		'0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
		'3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
		const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
    '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw603AjpA'+
    'qNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
		Cookies.set('___auth', token);
		Cookies.set('___refresh', refreshToken);


		const apiFn = jest.fn()
		const createRefreshData = createRefresh({
			interval: 10,
			refreshApiCallback: apiFn,
			initialRefreshComponent: <InitialRefreshComponent/>
		});

		const store = createAuthStore("cookie",{
      authName: '__',
      cookieDomain: window.location.hostname,
      cookieSecure: false,
      refresh: createRefreshData
    });

		const {container} = render(
			// @ts-expect-error refresh type
			<Refresh refresh={store.refresh} store={store.tokenStore}>
				<div>
					Container
				</div>
			</Refresh>
		);

		expect(container).toMatchSnapshot();
		expect(apiFn).not.toHaveBeenCalled();
		expect(doSignOutSpy).not.toHaveBeenCalled();
		expect(doRefreshSpy).not.toHaveBeenCalled();
	});

	describe('should render initial refresh component and api call and reducer call and state update, If refresh condition is there and if the refresh component is there', () => {
		it('API call is successfully', async () => {
			const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
			'0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw603AjpA'+
			'qNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
			Cookies.set('___refresh', refreshToken);

			const apiFn = jest.fn(
				() => new Promise<RefreshTokenActionResponse<unknown>>((resolve) => {
					setTimeout(resolve, 200, {
						newAuthToken: 'asdf',
						isSuccess: true
					})
				})
			);

			const createRefreshData = createRefresh({
				interval: 10,
				refreshApiCallback: apiFn,
				initialRefreshComponent: <InitialRefreshComponent/>
			});

      const store = createAuthStore("cookie",{
        authName: '__',
        cookieDomain: window.location.hostname,
        cookieSecure: false,
        refresh: createRefreshData,
        debug: false
      });

      expect(store.tokenStore.value).toStrictEqual({
        "auth": null,
        "isSignIn": false,
        "isUsingRefreshToken": true,
        "refresh": {
          "expiresAt": new Date("2223-10-14T04:33:15.000Z"),
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw603AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8",
        },
        "userState": null,
      });

      const {container} = render(
				// @ts-expect-error refresh type
				<Refresh refresh={store.refresh} store={store.tokenStore}>
					<div>
						Container
					</div>
				</Refresh>
			);

			expect(container).toMatchSnapshot();

      await act(async ()=>{
        await jest.runAllTimersAsync();
      });
			await waitFor(() => expect(apiFn).toHaveBeenCalledTimes(1))

			expect(container).toMatchSnapshot();
			expect(doSignOutSpy).not.toHaveBeenCalled();
			expect(doRefreshSpy).toHaveBeenCalled();
		});
		it('API call is not successfully', async () => {
      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
        '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw603AjpA'+
        'qNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
      Cookies.set('___refresh', refreshToken);

      const apiFn = jest.fn(
        () => new Promise<RefreshTokenActionResponse<unknown>>((resolve, reject) => {
          reject("Unknow error occurred")
        })
      );

      const createRefreshData = createRefresh({
        interval: 10,
        refreshApiCallback: apiFn,
        initialRefreshComponent: <InitialRefreshComponent/>
      });

      const store = createAuthStore("cookie",{
        authName: '__',
        cookieDomain: window.location.hostname,
        cookieSecure: false,
        refresh: createRefreshData,
        debug: false
      });

      expect(store.tokenStore.value).toStrictEqual({
        "auth": null,
        "isSignIn": false,
        "isUsingRefreshToken": true,
        "refresh": {
          "expiresAt": new Date("2223-10-14T04:33:15.000Z"),
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw603AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8",
        },
        "userState": null,
      });

      const {container} = render(
        // @ts-expect-error refresh type
        <Refresh refresh={store.refresh} store={store.tokenStore}>
          <div>
            Container
          </div>
        </Refresh>
      );

      expect(container).toMatchSnapshot();

      await act(async ()=>{
        await jest.runAllTimersAsync();
      });
      await waitFor(() => expect(apiFn).toHaveBeenCalledTimes(1))

      expect(container).toMatchSnapshot();
      expect(doSignOutSpy).toHaveBeenCalled();
      expect(doRefreshSpy).not.toHaveBeenCalled();
		});
	});

	// describe('If refresh condition is there, and if the refresh component is there, only api call and reducer call and state update', () => {
	// 	it('API call is successfully', () => {

	// 	});
	// 	it('API call is not successfully', () => {

	// 	});
	// });

	it('If no refresh token is there, do not refresh, and call signOut', () => {
		const api = jest.fn()
		const createRefreshData = createRefresh({
			interval: 10,
			refreshApiCallback: api,
			initialRefreshComponent: <InitialRefreshComponent />
		});

    const store = createAuthStore("cookie",{
      authName: '__',
      cookieDomain: window.location.hostname,
      cookieSecure: false,
      refresh: createRefreshData
    });


    const {container} = render(
			// @ts-expect-error refresh type
			<Refresh refresh={store.refresh} store={store.tokenStore}>
				<div>
					Container
				</div>
			</Refresh>
		);

		expect(container).toMatchSnapshot();
		expect(api).not.toHaveBeenCalled();

		expect(doSignOutSpy).toHaveBeenCalled();
		expect(doRefreshSpy).not.toHaveBeenCalled();
	});

	// it('If the refresh component is called once, then it should not call multiple times', () => {

	// });
});

describe('Periodic refresh', () => {
  it('should call API and action, if sign in', () => {

  });
  it('should should calling API and action, after triggering the sign out call', () => {

  });
  it('If sign out, nothing should happened', () => {

	});
});
