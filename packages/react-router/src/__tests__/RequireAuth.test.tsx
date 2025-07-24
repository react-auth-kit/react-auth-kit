// import * as React from 'react';
import Cookies from 'js-cookie';
import {render, screen} from '@testing-library/react';
import {Routes, Route, MemoryRouter} from 'react-router-dom';

import createAuthStore from 'react-auth-kit/store/createAuthStore';
import AuthProvider from 'react-auth-kit/AuthProvider';
import * as useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

import RequireAuth from '../RequireAuth';
import {AuthKitError} from 'react-auth-kit/error/AuthKitError';

const store = createAuthStore<Record<string, unknown>>("cookie",
  {
    authName: '__',
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === 'https:',
  });

describe('Error Conditions', ()=>{
  it('throws, when used outside AuthProvider', () => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn());

    expect(() => render(
        <MemoryRouter>
          <Routes>
            <Route path={'/'} element={
              <RequireAuth fallbackPath={'/login'}>
                <div>
                Protected
                </div>
              </RequireAuth>
            }/>
            <Route path={'/login'} element={
              <div>
                Login
              </div>
            }/>
          </Routes>
        </MemoryRouter>,
    )).toThrow(AuthKitError);
  });

  it('throws, when there is no fallbackPath', () => {
    expect(() => render(
        <AuthProvider store={store}>
          <MemoryRouter>
            <Routes>
              <Route path={'/'} element={
                <RequireAuth>
                  <div>
                  Protected
                  </div>
                </RequireAuth>
              }/>
              <Route path={'/login'} element={
                <div>
                  Login
                </div>
              }/>
            </Routes>
          </MemoryRouter>,
        </AuthProvider>,
    )).toThrow(AuthKitError);
  });
});

describe('Rendering Successfully', () => {
  it('With AuthProvider', () => {
    const {container} = render(
        <AuthProvider store={store}>
          <MemoryRouter>
            <Routes>
              <Route path={'/login'} element={
                <div>
                  Login
                </div>
              }/>
              <Route path={'/'} element={
                <div>
                  Home
                </div>
              }/>
              <Route element={
                <RequireAuth fallbackPath={'/login'}>
                  <div>
                    Protected
                  </div>
                </RequireAuth>
              }/>
            </Routes>
          </MemoryRouter>
        </AuthProvider>,
    );
    expect(container.nodeName).toMatch('DIV');
  });

  it('Token has not yet expired', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
      '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
      '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
    Cookies.set('___auth', token);
    Cookies.set('___auth_type', 'Bearer');
    Cookies.set('___state', '{}');
    const TestComponent = () => <p>Test Component</p>;
    const store = createAuthStore<Record<string, unknown>>("cookie",
      {
        authName: '__',
        cookieDomain: window.location.hostname,
        cookieSecure: window.location.protocol === 'https:',
      });

    render(
        <AuthProvider store={store}>
          <MemoryRouter>
            <Routes>
              <Route path={'/'} element={
                <RequireAuth fallbackPath={'/login'}>
                  <div>
                    <TestComponent/>
                  </div>
                </RequireAuth>
              }/>
              <Route path={'/login'} element={
                <div>
                Login
                </div>
              }/>
            </Routes>
          </MemoryRouter>
        </AuthProvider>,
    );

    expect(screen.getByText(/test component/i)).toBeTruthy();
  });
});

describe('Redirection', ()=>{
  it('With Component fallbackPath', ()=>{
    const spy = jest.spyOn(useIsAuthenticated, 'default');
    spy.mockImplementation(()=> ()=> false);

    const TestComponent = () => <p>Test Component</p>;
    const store = createAuthStore<Record<string, unknown>>("cookie",
      {
        authName: '__',
        cookieDomain: window.location.hostname,
        cookieSecure: window.location.protocol === 'https:',
      });

    render(
        <AuthProvider store={store}>
          <MemoryRouter>
            <Routes>
              <Route path={'/'} element={
                <RequireAuth fallbackPath={'/login'}>
                  <div>
                    <TestComponent/>
                  </div>
                </RequireAuth>
              }/>
              <Route path={'/login'} element={
                <div>
              Login
                </div>
              }/>
            </Routes>
          </MemoryRouter>
        </AuthProvider>,
    );

    expect(screen.getByText(/Login/i)).toBeTruthy();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('With AuthProvider fallbackPath', ()=>{
    const spy = jest.spyOn(useIsAuthenticated, 'default');
    spy.mockImplementation(()=> ()=> false);

    const TestComponent = () => <p>Test Component</p>;
    const store = createAuthStore<Record<string, unknown>>("cookie",
      {
        authName: '__',
        cookieDomain: window.location.hostname,
        cookieSecure: window.location.protocol === 'https:',
      });

    render(
        <AuthProvider store={store} fallbackPath='/login'>
          <MemoryRouter>
            <Routes>
              <Route path={'/'} element={
                <RequireAuth>
                  <div>
                    <TestComponent/>
                  </div>
                </RequireAuth>
              }/>
              <Route path={'/login'} element={
                <div>
              Login With AuthProvider fallbackPath
                </div>
              }/>
            </Routes>
          </MemoryRouter>
        </AuthProvider>,
    );

    expect(
        screen.getByText(/Login With AuthProvider fallbackPath/i),
    ).toBeTruthy();
    spy.mockRestore();
  });
});
