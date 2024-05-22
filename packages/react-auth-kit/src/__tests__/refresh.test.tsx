// import { ReactNode } from "react";
import Cookies from "js-cookie";
import { render, waitFor } from "@testing-library/react";

import Refresh from "../Refresh";
import createRefresh, { RefreshTokenCallbackResponse } from "../createRefresh";
import createStore from "../createStore";
import * as reducers from '../utils/reducers';

jest.useFakeTimers()

const doSignOutSpy = jest.spyOn(reducers, 'doSignOut');
const doRefreshSpy = jest.spyOn(reducers, 'doRefresh');

describe("Initial Refresh", () => {
	const InitialRefreshData = () => (
		<div>
			This is the initial Refresh
		</div>
	)
	
	afterEach(() => {
		Cookies.remove('__');
		Cookies.remove('___type');
		Cookies.remove('___state');
		Cookies.remove('___refresh');
		doRefreshSpy.mockClear();
		doSignOutSpy.mockClear();
	});

	it('If all tokens are present, do not refresh', () => {
		Cookies.set('___type', 'Bearer');
    Cookies.set('___state', '{}');
		const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
		'0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
		'3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
		const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
    '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw603AjpA'+
    'qNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
		Cookies.set('__', token);
		Cookies.set('___refresh', refreshToken);


		const api = jest.fn()
		const createRefreshData = createRefresh({
			interval: 10,
			refreshApiCallback: api,
			initalRefreshComponent: <InitialRefreshData/>
		});

		const store = createStore({
			authName: '__',
			authType: 'cookie',
			cookieDomain: window.location.hostname,
			cookieSecure: window.location.protocol === 'https:',
			refresh: createRefreshData,
			debug: false
		});

		const {container} = render(
			// @ts-expect-error refresh type
			<Refresh refresh={store.refresh} store={store.tokenObject}>
				<div>
					Container
				</div>
			</Refresh>
		);

		expect(container).toMatchSnapshot();
		expect(api).not.toHaveBeenCalled();
		expect(doSignOutSpy).not.toHaveBeenCalled();
		expect(doRefreshSpy).not.toHaveBeenCalled();
	});
	
	describe('If refresh condition is there and if the refresh component is there, render inital refresh component and api call and reducer call and state update', () => {
		it('API call is successfull', async () => {
			const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
			'0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw603AjpA'+
			'qNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
			Cookies.set('___refresh', refreshToken);
	
	
			const api = jest.fn(
				() => new Promise<RefreshTokenCallbackResponse<unknown>>((resolve) => {
					setTimeout(resolve, 50, {
						newAuthToken: 'asdf',
						isSuccess: true
					})
				})
			);

			const createRefreshData = createRefresh({
				interval: 10,
				refreshApiCallback: api,
				initalRefreshComponent: <InitialRefreshData/>
			});
	
			const store = createStore({
				authName: '__',
				authType: 'cookie',
				cookieDomain: window.location.hostname,
				cookieSecure: window.location.protocol === 'https:',
				refresh: createRefreshData,
				debug: true
			});
	
			const {container} = render(
				// @ts-expect-error refresh type
				<Refresh refresh={store.refresh} store={store.tokenObject}>
					<div>
						Container
					</div>
				</Refresh>
			);
	
			expect(container).toMatchSnapshot();

			jest.advanceTimersByTime(55);
			
			await waitFor(() => expect(api).toHaveBeenCalledTimes(1))

			expect(container).toMatchSnapshot();
			expect(doSignOutSpy).not.toHaveBeenCalled();
			expect(doRefreshSpy).toHaveBeenCalled();

		});
		it('API call is not successfull', () => {
			// const api = jest.fn(
			// 	() => new Promise((resolve, reject) => {
			// 		reject('error');
			// 	})
			// );
		});
	});
	
	// describe('If refresh condition is there and if the refresh component is there, only api call and reducer call and state update', () => {
	// 	it('API call is successfull', () => {

	// 	});
	// 	it('API call is not successfull', () => {

	// 	});
	// });
	
	it('If no refresh token is there, do not refresh, and call signOut', () => {
		const api = jest.fn()
		const createRefreshData = createRefresh({
			interval: 10,
			refreshApiCallback: api,
			initalRefreshComponent: <InitialRefreshData />
		});

		const store = createStore({
			authName: '__',
			authType: 'cookie',
			cookieDomain: window.location.hostname,
			cookieSecure: window.location.protocol === 'https:',
			refresh: createRefreshData,
			debug: false
		});

		const {container} = render(
			// @ts-expect-error refresh type
			<Refresh refresh={store.refresh} store={store.tokenObject}>
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
	
	// it('If the refresh component is called once, then it should not called multiple times', () => {

	// });
});

// describe('Pariodic refresh', () => {
// 	it('If signIn, the pariodic refresh is running, api is calling and reducer is called', () => {

// 	});
// 	it('If signout, nothing should happended', () => {

// 	});
// });

// describe('Initial Refresh and Pariodic refresh', () => {
// 	it('Check the initial refresh in done and then pariodic refresh is working', () => {

// 	});
// })
