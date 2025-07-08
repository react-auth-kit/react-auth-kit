import TokenObject from '../RxTokenObject';
import createRefresh, {createRefreshParamInterface} from '../createRefresh';
import authStore from '../store';
import {AuthError} from '../errors';

describe('Store without refreshtoken', ()=>{
  it('Store creation local store', ()=> {
    const store = authStore({
      authName: '__auth',
      authType: 'localstorage',
    });
    const tokenObject = new TokenObject('__auth', 'localstorage', null, false );
    expect(store.refresh).toBeUndefined();
    expect(store.tokenObject.value).toEqual(tokenObject.value);
  });

  it('Store creation cookie', ()=> {
    const store = () => authStore({
      authName: '__auth',
      authType: 'cookie',
      cookieDomain: window.location.hostname,
      cookieSecure: false,
    });
    const tokenObject = new TokenObject(
        '__auth',
        'cookie',
        null,
        false,
        window.location.hostname,
        false,
    );
    expect(store).not.toThrow(AuthError);
    expect(store().refresh).toBeUndefined();
    expect(store().tokenObject.value).toEqual(tokenObject.value);
  });
});

describe('Store with refreshtoken', ()=>{
  let refresh: createRefreshParamInterface<object>;
  beforeAll(()=>{
    refresh = createRefresh({
      interval: 10,
      refreshApiCallback: async (param) => {
        param.authToken;
        param.authUserState;
        param.refreshToken;

        return {
          isSuccess: true,
          newAuthToken: param.authToken || 'Hello',
        };
      },
    });
  });

  it('Store creation local store', ()=> {
    const store = authStore({
      authName: '__auth',
      authType: 'localstorage',
      refresh: refresh,
      debug: false,
    });
    const tokenObject = new TokenObject(
        '__auth',
        'localstorage',
        '__auth_state',
        false,
    );
    expect(store.refresh).toEqual(refresh);
    expect(store.tokenObject.value).toEqual(tokenObject.value);
  });

  it('Store creation cookie', ()=> {
    const store = () => authStore({
      authName: '__auth',
      authType: 'cookie',
      cookieDomain: window.location.hostname,
      cookieSecure: false,
      refresh: refresh,
    });
    const tokenObject = new TokenObject(
        '__auth',
        'cookie',
        '__auth_state',
        false,
        window.location.hostname,
        false,
    );

    expect(store).not.toThrow(AuthError);
    expect(store().refresh).toEqual(refresh);
    expect(store().tokenObject.value).toEqual(tokenObject.value);
  });
});

describe('authStore Throws error if cookie params not given', ()=>{
  it('cookieDomain and cookieSecure', ()=>{
    const store = () => authStore({
      authName: '__auth',
      authType: 'cookie',
    });
    expect(store).toThrow(AuthError);
  });
  it('cookieSecure', ()=>{
    const store = () => authStore({
      authName: '__auth',
      authType: 'cookie',
      cookieSecure: false,
    });
    expect(store).toThrow(AuthError);
  });
  it('cookieDomain', ()=>{
    const store = () => authStore({
      authName: '__auth',
      authType: 'cookie',
      cookieDomain: window.location.hostname,
    });
    expect(store).toThrow(AuthError);
  });
});
