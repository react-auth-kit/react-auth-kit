import Cookies from 'js-cookie';
import TokenObject from '../RxTokenObject';
import {AuthError} from "../errors";

describe('Initial Value [Without Refresh Token]', () => {
  it('No Existing cookie is there', () => {
    const subscriber = jest.fn();
    expect(subscriber.mock.calls).toHaveLength(0);

    const tokenObject = new TokenObject<object>(
        '__',
        'cookie',
        null,
        false,
        window.location.hostname,
        window.location.protocol === 'https:',
    );

    tokenObject.subscribe(subscriber);

    expect(tokenObject.value).toMatchObject(
        {
          'auth': null,
          'isSignIn': false,
          'isUsingRefreshToken': false,
          'refresh': null,
          'userState': null,
        },
    );
    expect(subscriber).toHaveBeenCalled();
    expect(subscriber.mock.calls).toHaveLength(1);
    expect(subscriber).toHaveBeenCalledWith(
        {
          'auth': null,
          'isSignIn': false,
          'isUsingRefreshToken': false,
          'refresh': null,
          'userState': null,
        },
    );
  });

  it('No Existing Local Storage is there', () => {
    const subscriber = jest.fn();
    expect(subscriber.mock.calls).toHaveLength(0);

    const tokenObject = new TokenObject<object>(
        '__',
        'localstorage',
        null,
        false,
    );

    tokenObject.subscribe(subscriber);

    expect(tokenObject.value).toMatchObject(
        {
          'auth': null,
          'isSignIn': false,
          'isUsingRefreshToken': false,
          'refresh': null,
          'userState': null,
        },
    );
    expect(subscriber).toBeCalled();
    expect(subscriber.mock.calls).toHaveLength(1);
    expect(subscriber).toHaveBeenCalledWith(
        {
          'auth': null,
          'isSignIn': false,
          'isUsingRefreshToken': false,
          'refresh': null,
          'userState': null,
        },
    );
  });

  describe('Existing Cookies are there', () => {
    beforeEach(() => {
      Cookies.set('___type', 'Bearer');
      Cookies.set('___state', '{}');
    });

    afterEach(() => {
      Cookies.remove('__');
      Cookies.remove('___type');
      Cookies.remove('___state');
    });

    it('Existing Cookies are there', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
      '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
      '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
      Cookies.set('__', token);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          null,
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': {
          'token': token,
          'type': 'Bearer',
          'expiresAt': new Date(8008605195 * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': {},
      };

      expect(tokenObject.value).toMatchObject(resp);
      expect(subscriber).toHaveBeenCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Cookie is not a proper JWT', () => {
      const token = 'tampered_';
      Cookies.set('__', token);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(Cookies.get('__')).toBe(token);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');

      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          null,
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);
      expect(Cookies.get('__')).toBeUndefined();
      expect(Cookies.get('___type')).toBeUndefined();
      expect(Cookies.get('___state')).toBeUndefined();

      expect(subscriber).toBeCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Cookie JWT has no iat param', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
      '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.Gfx6VO9tcxwk6xqx9yYzSfebfeakZ'+
      'p5JYIgP_edcw_A';
      Cookies.set('__', token);

      expect(Cookies.get('__')).toBe(token);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          null,
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);

      expect(Cookies.get('__')).toBeUndefined();
      expect(Cookies.get('___type')).toBeUndefined();
      expect(Cookies.get('___state')).toBeUndefined();

      expect(subscriber).toBeCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Cookie was expired', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0'+
      'NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo5NzE0OTc5OTV9.XJbNAE'+
      '-aRz7tO7tSHiUlMGGuUrAELPPkNITKVlNZ8DA';
      Cookies.set('__', token);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          null,
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);

      expect(Cookies.get('__')).toBeUndefined();
      expect(Cookies.get('___type')).toBeUndefined();
      expect(Cookies.get('___state')).toBeUndefined();

      expect(subscriber).toBeCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing User State is not Parsable', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
      '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
      '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
      Cookies.set('__', token);
      Cookies.set('___state', 'asdfslafdal');


      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          null,
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);
      expect(subscriber).toHaveBeenCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });
  });

  describe('Existing Local Storage are there', () => {
    beforeEach(() => {
      localStorage.setItem('___type', 'Bearer');
      localStorage.setItem('___state', '{}');
    });

    afterEach(() => {
      localStorage.removeItem('__');
      localStorage.removeItem('___type');
      localStorage.removeItem('___state');
    });

    it('Existing Local Storage are there', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NT'+
      'Y3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw603AjpAqN'+
      'wnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
      localStorage.setItem('__', token);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          null,
          false,
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': {
          'token': token,
          'type': 'Bearer',
          'expiresAt': new Date(8008605195 * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': {},
      };

      expect(tokenObject.value).toMatchObject(resp);

      expect(localStorage.getItem('__')).toBe(token);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');

      expect(subscriber).toBeCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Local Storage is not a proper JWT', () => {
      const token = 'tampered_';
      localStorage.setItem('__', token);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(localStorage.getItem('__')).toBe(token);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');

      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          null,
          false,
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);
      expect(localStorage.getItem('__')).toBeNull();
      expect(localStorage.getItem('___type')).toBeNull();
      expect(localStorage.getItem('___state')).toBeNull();

      expect(subscriber).toBeCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Local Storage JWT has no exp param', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
      '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.Gfx6VO9tcxwk6xqx9yYzSfebfeakZp'+
      '5JYIgP_edcw_A';
      localStorage.setItem('__', token);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(localStorage.getItem('__')).toBe(token);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');

      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          null,
          false,
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);
      expect(localStorage.getItem('__')).toBeNull();
      expect(localStorage.getItem('___type')).toBeNull();
      expect(localStorage.getItem('___state')).toBeNull();

      expect(subscriber).toBeCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Localstorage was expired', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NT'+
      'Y3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo5NzE0OTc5OTV9.LTw5GVQ3Y4h35t'+
      'Z6HMSS5fRh8hknu3vM1bN7wx4DvM0';
      localStorage.setItem('__', token);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          null,
          false,
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);

      expect(localStorage.getItem('__')).toBeNull();
      expect(localStorage.getItem('___type')).toBeNull();
      expect(localStorage.getItem('___state')).toBeNull();

      expect(subscriber).toBeCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing User State is not Parsable', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
      '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
      '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
      localStorage.setItem('__', token);
      localStorage.setItem('___state', 'asdfslafdal');


      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          null,
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);
      expect(subscriber).toHaveBeenCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });
  });
});

describe('Initial Value [With Refresh Token]', () => {
  it('No Existing cookie is there', () => {
    const subscriber = jest.fn();
    expect(subscriber.mock.calls).toHaveLength(0);

    const tokenObject = new TokenObject<object>(
        '__',
        'cookie',
        '__re',
        false,
        window.location.hostname,
        window.location.protocol === 'https:',
    );

    tokenObject.subscribe(subscriber);

    expect(tokenObject.value).toMatchObject(
        {
          'auth': null,
          'isSignIn': false,
          'isUsingRefreshToken': true,
          'refresh': null,
          'userState': null,
        },
    );
    expect(subscriber).toBeCalled();
    expect(subscriber.mock.calls).toHaveLength(1);
    expect(subscriber).toHaveBeenCalledWith(
        {
          'auth': null,
          'isSignIn': false,
          'isUsingRefreshToken': true, 'refresh': null, 'userState': null,
        },
    );
  });

  it('No Existing Local Storage is there', () => {
    const subscriber = jest.fn();
    expect(subscriber.mock.calls).toHaveLength(0);

    const tokenObject = new TokenObject<object>(
        '__',
        'localstorage',
        '__re',
        false,
    );

    tokenObject.subscribe(subscriber);

    expect(tokenObject.value).toMatchObject(
        {
          'auth': null,
          'isSignIn': false,
          'isUsingRefreshToken': true,
          'refresh': null,
          'userState': null,
        },
    );
    expect(subscriber).toBeCalled();
    expect(subscriber.mock.calls).toHaveLength(1);
    expect(subscriber).toHaveBeenCalledWith(
        {
          'auth': null,
          'isSignIn': false,
          'isUsingRefreshToken': true,
          'refresh': null,
          'userState': null,
        },
    );
  });

  describe('Existing Cookies are there', () => {
    beforeEach(() => {
      Cookies.set('___type', 'Bearer');
      Cookies.set('___state', '{}');
    });

    afterEach(() => {
      Cookies.remove('__');
      Cookies.remove('___type');
      Cookies.remove('___state');
      Cookies.remove('__re');
    });

    it('Existing Cookies are there', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0N'+
      'TY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw603AjpA'+
      'qNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
      Cookies.set('__', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiO'+
      'iIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjIwODYzfQ.q'+
      'vc94iV3P4eJQ9Z_Pnjbz2yLs1jz-KGek3uD6kFndEE';
      Cookies.set('__re', refreshToken);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(Cookies.get('__')).toBe(token);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('__re')).toBe(refreshToken);

      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          '__re',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': {
          'token': token,
          'type': 'Bearer',
          'expiresAt': new Date(8008605195 * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': refreshToken,
          'expiresAt': new Date(8008620863 * 1000),
        },
        'userState': {},
      };

      expect(tokenObject.value).toMatchObject(resp);

      expect(Cookies.get('__')).toBe(token);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('__re')).toBe(refreshToken);

      expect(subscriber).toBeCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Cookie is not a proper JWT but Refresh'+
    ' Token is a proper JWT', () => {
      const token = 'tampered_';
      Cookies.set('__', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiO'+
      'iIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjIwODYzfQ.q'+
      'vc94iV3P4eJQ9Z_Pnjbz2yLs1jz-KGek3uD6kFndEE';
      Cookies.set('__re', refreshToken);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(Cookies.get('__')).toBe(token);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('__re')).toBe(refreshToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          '__re',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': refreshToken,
          'expiresAt': new Date(8008620863 * 1000),
        },
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);

      expect(Cookies.get('__')).toBeUndefined();
      expect(Cookies.get('___type')).toBeUndefined();
      expect(Cookies.get('___state')).toBeUndefined();
      expect(Cookies.get('__re')).toBe(refreshToken);

      expect(subscriber).toBeCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Cookie JWT has no exp param but Refresh'+
    ' Token is a proper JWT', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0N'+
      'TY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.Gfx6VO9tcxwk6xqx9yYzSfebfeakZp5JYI'+
      'gP_edcw_A';
      Cookies.set('__', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiO'+
      'iIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjIwODYzfQ.q'+
      'vc94iV3P4eJQ9Z_Pnjbz2yLs1jz-KGek3uD6kFndEE';
      Cookies.set('__re', refreshToken);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(Cookies.get('__')).toBe(token);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('__re')).toBe(refreshToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          '__re',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': refreshToken,
          'expiresAt': new Date(8008620863 * 1000),
        },
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);

      expect(Cookies.get('__')).toBeUndefined();
      expect(Cookies.get('___type')).toBeUndefined();
      expect(Cookies.get('___state')).toBeUndefined();
      expect(Cookies.get('__re')).toBe(refreshToken);

      expect(subscriber).toBeCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Cookie and Refresh Cookies are not a proper JWT', () => {
      const token = 'tampered_';
      Cookies.set('__', token);

      const refreshToken = 'tempered__';
      Cookies.set('__re', refreshToken);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(Cookies.get('__')).toBe(token);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('__re')).toBe(refreshToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          '__re',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': null,
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);

      expect(Cookies.get('__')).toBeUndefined();
      expect(Cookies.get('___type')).toBeUndefined();
      expect(Cookies.get('___state')).toBeUndefined();
      expect(Cookies.get('__re')).toBeUndefined();

      expect(subscriber).toBeCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Cookie and Refresh Cookies JWT both'+
    ' are not have exp param', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0'+
      'NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.Gfx6VO9tcxwk6xqx9yYzSfebfeakZp5'+
      'JYIgP_edcw_A';
      Cookies.set('__', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOi'+
      'IxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.Gfx6VO9tcxwk6xqx9yYzSfebfe'+
      'akZp5JYIgP_edcw_A';
      Cookies.set('__re', refreshToken);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(Cookies.get('__')).toBe(token);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('__re')).toBe(refreshToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          '__re',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': null,
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);

      expect(Cookies.get('__')).toBeUndefined();
      expect(Cookies.get('___type')).toBeUndefined();
      expect(Cookies.get('___state')).toBeUndefined();
      expect(Cookies.get('__re')).toBeUndefined();

      expect(subscriber).toBeCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Cookie was already expired but Refresh'+
    ' Cookie is not expired', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0N'+
      'TY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo5NzE0OTc5OTV9.LTw5GVQ3Y4h3'+
      '5tZ6HMSS5fRh8hknu3vM1bN7wx4DvM0';
      Cookies.set('__', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiO'+
      'iIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjIwODYzfQ.q'+
      'vc94iV3P4eJQ9Z_Pnjbz2yLs1jz-KGek3uD6kFndEE';
      Cookies.set('__re', refreshToken);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(Cookies.get('__')).toBe(token);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('__re')).toBe(refreshToken);

      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          '__re',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': refreshToken,
          'expiresAt': new Date(8008620863 * 1000),
        },
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);

      expect(Cookies.get('__')).toBeUndefined();
      expect(Cookies.get('___type')).toBeUndefined();
      expect(Cookies.get('___state')).toBeUndefined();
      expect(Cookies.get('__re')).toBe(refreshToken);

      expect(subscriber).toBeCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Cookie and Refresh Cookie were already expired', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NT'+
      'Y3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo5NzE0OTc5OTV9.LTw5GVQ3Y4h35t'+
      'Z6HMSS5fRh8hknu3vM1bN7wx4DvM0';
      Cookies.set('__', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI'+
      'xMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo5NzE0OTc5OTV9.LTw5GVQ'+
      '3Y4h35tZ6HMSS5fRh8hknu3vM1bN7wx4DvM0';
      Cookies.set('__re', refreshToken);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(Cookies.get('__')).toBe(token);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('__re')).toBe(refreshToken);

      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          '__re',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': null,
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);

      expect(Cookies.get('__')).toBeUndefined();
      expect(Cookies.get('___type')).toBeUndefined();
      expect(Cookies.get('___state')).toBeUndefined();
      expect(Cookies.get('__re')).toBeUndefined();

      expect(subscriber).toBeCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });
  });

  describe('Existing Local Storage are there', () => {
    beforeEach(() => {
      localStorage.setItem('___type', 'Bearer');
      localStorage.setItem('___state', '{}');
    });

    afterEach(() => {
      localStorage.removeItem('__');
      localStorage.removeItem('___type');
      localStorage.removeItem('___state');
      localStorage.removeItem('__re');
    });

    it('Existing Local Storage are there', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0N'+
      'TY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw603AjpA'+
      'qNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
      localStorage.setItem('__', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiO'+
      'iIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjIwODYzfQ.q'+
      'vc94iV3P4eJQ9Z_Pnjbz2yLs1jz-KGek3uD6kFndEE';
      localStorage.setItem('__re', refreshToken);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(localStorage.getItem('__')).toBe(token);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');
      expect(localStorage.getItem('__re')).toBe(refreshToken);

      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          '__re',
          false,
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': {
          'token': token,
          'type': 'Bearer',
          'expiresAt': new Date(8008605195 * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': refreshToken,
          'expiresAt': new Date(8008620863 * 1000),
        },
        'userState': {},
      };

      expect(tokenObject.value).toMatchObject(resp);

      expect(localStorage.getItem('__')).toBe(token);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');
      expect(localStorage.getItem('__re')).toBe(refreshToken);

      expect(subscriber).toBeCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Token is not a proper JWT but'+
    ' Refresh Token is a proper JWT', () => {
      const token = 'tampered_';
      localStorage.setItem('__', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiO'+
      'iIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjIwODYzfQ.q'+
      'vc94iV3P4eJQ9Z_Pnjbz2yLs1jz-KGek3uD6kFndEE';
      localStorage.setItem('__re', refreshToken);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(localStorage.getItem('__')).toBe(token);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');
      expect(localStorage.getItem('__re')).toBe(refreshToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          '__re',
          false,
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': refreshToken,
          'expiresAt': new Date(8008620863 * 1000),
        },
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);

      expect(localStorage.getItem('__')).toBeNull();
      expect(localStorage.getItem('___type')).toBeNull();
      expect(localStorage.getItem('___state')).toBeNull();
      expect(localStorage.getItem('__re')).toBe(refreshToken);

      expect(subscriber).toBeCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Token JWT has no exp param but Refresh'+
    ' Token is a proper JWT', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0'+
      'NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.Gfx6VO9tcxwk6xqx9yYzSfebfeakZp5'+
      'JYIgP_edcw_A';
      localStorage.setItem('__', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiO'+
      'iIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjIwODYzfQ.q'+
      'vc94iV3P4eJQ9Z_Pnjbz2yLs1jz-KGek3uD6kFndEE';
      localStorage.setItem('__re', refreshToken);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(localStorage.getItem('__')).toBe(token);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');
      expect(localStorage.getItem('__re')).toBe(refreshToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          '__re',
          false,
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': refreshToken,
          'expiresAt': new Date(8008620863 * 1000),
        },
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);

      expect(localStorage.getItem('__')).toBeNull();
      expect(localStorage.getItem('___type')).toBeNull();
      expect(localStorage.getItem('___state')).toBeNull();
      expect(localStorage.getItem('__re')).toBe(refreshToken);

      expect(subscriber).toBeCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Token and Refresh Token are not a proper JWT', () => {
      const token = 'tampered_';
      localStorage.setItem('__', token);

      const refreshToken = 'tempered__';
      localStorage.setItem('__re', refreshToken);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(localStorage.getItem('__')).toBe(token);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');
      expect(localStorage.getItem('__re')).toBe(refreshToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          '__re',
          false,
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': null,
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);

      expect(localStorage.getItem('__')).toBeNull();
      expect(localStorage.getItem('___type')).toBeNull();
      expect(localStorage.getItem('___state')).toBeNull();
      expect(localStorage.getItem('__re')).toBeNull();

      expect(subscriber).toBeCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Token and Refresh Token JWT'+
    ' are not have iat param', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0N'+
      'TY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.Gfx6VO9tcxwk6xqx9yYzSfebfeakZp5JY'+
      'IgP_edcw_A';
      localStorage.setItem('__', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOi'+
      'IxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.Gfx6VO9tcxwk6xqx9yYzSfebfe'+
      'akZp5JYIgP_edcw_A';
      localStorage.setItem('__re', refreshToken);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(localStorage.getItem('__')).toBe(token);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');
      expect(localStorage.getItem('__re')).toBe(refreshToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          '__re',
          false,
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': null,
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);

      expect(localStorage.getItem('__')).toBeNull();
      expect(localStorage.getItem('___type')).toBeNull();
      expect(localStorage.getItem('___state')).toBeNull();
      expect(localStorage.getItem('__re')).toBeNull();

      expect(subscriber).toBeCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Token was already expired but Refresh '+
    'Token is not expired', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0N'+
      'TY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo5NzE0OTc5OTV9.LTw5GVQ3Y4h3'+
      '5tZ6HMSS5fRh8hknu3vM1bN7wx4DvM0';
      localStorage.setItem('__', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiO'+
      'iIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjIwODYzfQ.q'+
      'vc94iV3P4eJQ9Z_Pnjbz2yLs1jz-KGek3uD6kFndEE';
      localStorage.setItem('__re', refreshToken);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(localStorage.getItem('__')).toBe(token);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');
      expect(localStorage.getItem('__re')).toBe(refreshToken);

      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          '__re',
          false,
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': refreshToken,
          'expiresAt': new Date(8008620863 * 1000),
        },
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);

      expect(localStorage.getItem('__')).toBeNull();
      expect(localStorage.getItem('___type')).toBeNull();
      expect(localStorage.getItem('___state')).toBeNull();
      expect(localStorage.getItem('__re')).toBe(refreshToken);

      expect(subscriber).toBeCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Token and Refresh Token were already expired', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0N'+
      'TY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo5NzE0OTc5OTV9.XJbNAE-aRz7t'+
      'O7tSHiUlMGGuUrAELPPkNITKVlNZ8DA';
      localStorage.setItem('__', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI'+
      'xMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo5NzE0OTc5OTV9.XJbNAE-'+
      'aRz7tO7tSHiUlMGGuUrAELPPkNITKVlNZ8DA';
      localStorage.setItem('__re', refreshToken);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(localStorage.getItem('__')).toBe(token);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');
      expect(localStorage.getItem('__re')).toBe(refreshToken);

      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          '__re',
          false,
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': null,
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);

      expect(localStorage.getItem('__')).toBeNull();
      expect(localStorage.getItem('___type')).toBeNull();
      expect(localStorage.getItem('___state')).toBeNull();
      expect(localStorage.getItem('__re')).toBeNull();

      expect(subscriber).toBeCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });
  });
});

describe('Set New Value with Existing Value [Without Refresh Token]', () => {
  describe('Using Cookie', () => {
    const oldToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
    '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw603AjpA'+
    'qNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
    const oldExp = 8008605195;

    const newToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0'+
    'NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxMTE2NDY0ODI1Nn0.Vf-miK3nrkJ'+
    '1svSRu_4AHmPxVPceN6GqESN7rsffLmg';
    const newExp = 11164648256;

    let subscribeCount: number;
    beforeEach(() => {
      subscribeCount = 0;
      Cookies.set('__', oldToken);
      Cookies.set('___type', 'Bearer');
      Cookies.set('___state', '{}');
    });

    afterEach(() => {
      Cookies.remove('__');
      Cookies.remove('___type');
      Cookies.remove('___state');
    });

    it('Setting up new token', (done) => {
      expect(Cookies.get('__')).toBe(oldToken);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');

      const tokenObject = () => new TokenObject<object>(
          '__',
          'cookie',
          null,
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      expect(tokenObject).toThrow(AuthError)

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': newToken,
          'type': 'Bearer',
          'expiresAt': new Date(newExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': {},
      };

      const fn = jest.fn();

      tokenObject().subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('__')).toBe(oldToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('__')).toBe(newToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(fn).toHaveBeenCalled();
          done();
        }
      });

      tokenObject().onSignIn(fn);

      tokenObject().set({
        'auth': {
          'token': newToken,
          'type': 'Bearer',
        },
      });
    }, 10000);

    it('Setting up new User State', (done) => {
      expect(Cookies.get('__')).toBe(oldToken);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');

      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          null,
          true,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': {
          'a': 'b',
        },
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('__')).toBe(oldToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('__')).toBe(oldToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{"a":"b"}');
          done();
        }
      });

      tokenObject.set({
        userState: {
          'a': 'b',
        },
      });
    }, 10000);

    it('Setting up new token and new state', (done)=>{
      expect(Cookies.get('__')).toBe(oldToken);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');

      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          null,
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': newToken,
          'type': 'Bearer',
          'expiresAt': new Date(newExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': {
          'a': 'b',
        },
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('__')).toBe(oldToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('__')).toBe(newToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{"a":"b"}');
          done();
        }
      });

      tokenObject.set({
        'auth': {
          'token': newToken,
          'type': 'Bearer',
        },
        'userState': {
          'a': 'b',
        },
      });
    }, 10000);

    it('Setting up new tampered token and new state', (done)=>{
      expect(Cookies.get('__')).toBe(oldToken);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');

      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          null,
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': {},
      };

      const newResp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': null,
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('__')).toBe(oldToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('__')).toBeUndefined();
          expect(Cookies.get('___type')).toBeUndefined();
          expect(Cookies.get('___state')).toBeUndefined();
          done();
        }
      });

      const t = () => {
        tokenObject.set({
          'auth': {
            'token': 'tampered_',
            'type': 'Bearer',
          },
          'userState': {
            'a': 'b',
          },
        });
      }

      expect(t).toThrow(AuthError);
    }, 10000);

    it('Setting up new expired token and new state', (done)=>{
      expect(Cookies.get('__')).toBe(oldToken);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');

      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          null,
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': {},
      };

      const newResp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': null,
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('__')).toBe(oldToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('__')).toBeUndefined();
          expect(Cookies.get('___type')).toBeUndefined();
          expect(Cookies.get('___state')).toBeUndefined();
          done();
        }
      });

      tokenObject.set({
        'auth': {
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY'+
          '3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo5NzE0OTc5OTV9.LTw5GVQ3Y4h'+
          '35tZ6HMSS5fRh8hknu3vM1bN7wx4DvM0',
          'type': 'Bearer',
        },
        'userState': {
          'a': 'b',
        },
      });
    }, 10000);

    it('Removing Auth Token', (done)=>{
      expect(Cookies.get('__')).toBe(oldToken);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');

      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          null,
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const fn = jest.fn();

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': {},
      };

      const newResp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': null,
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('__')).toBe(oldToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('__')).toBeUndefined();
          expect(Cookies.get('___type')).toBeUndefined();
          expect(Cookies.get('___state')).toBeUndefined();
          setTimeout(()=>{
            expect(fn).toHaveBeenCalled();
          }, 0);
          done();
        }
      });

      tokenObject.onSignOut(fn);

      tokenObject.set({
        'auth': null,
      });
    }, 10000);
  });

  describe('Using Local Storage', () => {
    const oldToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
    '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw603AjpA'+
    'qNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
    const oldExp = 8008605195;

    const newToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0'+
    'NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxMTE2NDY0ODI1Nn0.Vf-miK3nrkJ'+
    '1svSRu_4AHmPxVPceN6GqESN7rsffLmg';
    const newExp = 11164648256;

    let subscribeCount: number;
    beforeEach(() => {
      subscribeCount = 0;
      localStorage.setItem('__', oldToken);
      localStorage.setItem('___type', 'Bearer');
      localStorage.setItem('___state', '{}');
    });

    afterEach(() => {
      localStorage.removeItem('__');
      localStorage.removeItem('___type');
      localStorage.removeItem('___state');
    });

    it('Setting up new token', (done) => {
      expect(localStorage.getItem('__')).toBe(oldToken);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');

      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          null,
          false,
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': newToken,
          'type': 'Bearer',
          'expiresAt': new Date(newExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': {},
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(localStorage.getItem('__')).toBe(oldToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{}');
          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(localStorage.getItem('__')).toBe(newToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{}');
          done();
        }
      });

      tokenObject.set({
        'auth': {
          'token': newToken,
          'type': 'Bearer',
        },
      });
    }, 10000);

    it('Setting up new User State', (done) => {
      expect(localStorage.getItem('__')).toBe(oldToken);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');

      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          null,
          false,
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': {
          'a': 'b',
        },
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(localStorage.getItem('__')).toBe(oldToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{}');
          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(localStorage.getItem('__')).toBe(oldToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{"a":"b"}');
          done();
        }
      });

      tokenObject.set({
        userState: {
          'a': 'b',
        },
      });
    }, 10000);

    it('Setting up new token and new state', (done)=>{
      expect(localStorage.getItem('__')).toBe(oldToken);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');

      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          null,
          false,
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': newToken,
          'type': 'Bearer',
          'expiresAt': new Date(newExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': {
          'a': 'b',
        },
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(localStorage.getItem('__')).toBe(oldToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{}');
          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(localStorage.getItem('__')).toBe(newToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{"a":"b"}');
          done();
        }
      });

      tokenObject.set({
        'auth': {
          'token': newToken,
          'type': 'Bearer',
        },
        'userState': {
          'a': 'b',
        },
      });
    }, 10000);

    it('Setting up new tampered token and new state', (done)=>{
      expect(localStorage.getItem('__')).toBe(oldToken);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');

      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          null,
          false,
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': {},
      };

      const newResp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': null,
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(localStorage.getItem('__')).toBe(oldToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{}');
          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(localStorage.getItem('__')).toBeNull();
          expect(localStorage.getItem('___type')).toBeNull();
          expect(localStorage.getItem('___state')).toBeNull();
          done();
        }
      });

      tokenObject.set({
        'auth': {
          'token': 'tampered_',
          'type': 'Bearer',
        },
        'userState': {
          'a': 'b',
        },
      });
    }, 10000);

    it('Setting up new expired token and new state', (done)=>{
      expect(localStorage.getItem('__')).toBe(oldToken);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');

      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          null,
          false,
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': {},
      };

      const newResp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': null,
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(localStorage.getItem('__')).toBe(oldToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{}');
          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(localStorage.getItem('__')).toBeNull();
          expect(localStorage.getItem('___type')).toBeNull();
          expect(localStorage.getItem('___state')).toBeNull();
          done();
        }
      });

      tokenObject.set({
        'auth': {
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0'+
          'NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo5NzE0OTc5OTV9.LTw5G'+
          'VQ3Y4h35tZ6HMSS5fRh8hknu3vM1bN7wx4DvM0',
          'type': 'Bearer',
        },
        'userState': {
          'a': 'b',
        },
      });
    }, 10000);

    it('Removing Auth Token', (done)=>{
      expect(localStorage.getItem('__')).toBe(oldToken);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');

      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          null,
          false,
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': {},
      };

      const newResp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': null,
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(localStorage.getItem('__')).toBe(oldToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{}');
          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(localStorage.getItem('__')).toBeNull();
          expect(localStorage.getItem('___type')).toBeNull();
          expect(localStorage.getItem('___state')).toBeNull();
          done();
        }
      });

      tokenObject.set({
        'auth': null,
      });
    }, 10000);
  });
});

describe('Set New Value with Existing Value [With Refresh Token]', () => {
  describe('Using Cookie', () => {
    const oldToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
    '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw603AjpA'+
    'qNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
    const oldExp = 8008605195;

    const newToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0'+
    'NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxMTE2NDY0ODI1Nn0.Vf-miK3nrkJ'+
    '1svSRu_4AHmPxVPceN6GqESN7rsffLmg';
    const newExp = 11164648256;

    let subscribeCount: number;
    beforeEach(() => {
      subscribeCount = 0;
      Cookies.set('__', oldToken);
      Cookies.set('___type', 'Bearer');
      Cookies.set('___state', '{}');
      Cookies.set('___refresh', oldToken);
    });

    afterEach(() => {
      Cookies.remove('__');
      Cookies.remove('___type');
      Cookies.remove('___state');
      Cookies.remove('___refresh');
    });

    it('Setting up new Auth token', (done) => {
      expect(Cookies.get('__')).toBe(oldToken);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(oldToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': newToken,
          'type': 'Bearer',
          'expiresAt': new Date(newExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('__')).toBe(oldToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);
          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('__')).toBe(newToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);

          done();
        }
      });

      tokenObject.set({
        'auth': {
          'token': newToken,
          'type': 'Bearer',
        },
      });
    }, 10000);

    it('Setting up new User State', (done) => {
      expect(Cookies.get('__')).toBe(oldToken);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(oldToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {
          'a': 'b',
        },
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('__')).toBe(oldToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('__')).toBe(oldToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{"a":"b"}');
          expect(Cookies.get('___refresh')).toBe(oldToken);

          done();
        }
      });

      tokenObject.set({
        userState: {
          'a': 'b',
        },
      });
    }, 10000);

    it('Setting up new token and new state', (done)=>{
      expect(Cookies.get('__')).toBe(oldToken);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(oldToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': newToken,
          'type': 'Bearer',
          'expiresAt': new Date(newExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {
          'a': 'b',
        },
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('__')).toBe(oldToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('__')).toBe(newToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{"a":"b"}');
          expect(Cookies.get('___refresh')).toBe(oldToken);

          done();
        }
      });

      tokenObject.set({
        'auth': {
          'token': newToken,
          'type': 'Bearer',
        },
        'userState': {
          'a': 'b',
        },
      });
    }, 10000);

    it('Setting up new tampered token and new state', (done)=>{
      expect(Cookies.get('__')).toBe(oldToken);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(oldToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': null,
        'userState': null,
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('__')).toBe(oldToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);
          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('__')).toBeUndefined();
          expect(Cookies.get('___type')).toBeUndefined();
          expect(Cookies.get('___state')).toBeUndefined();
          expect(Cookies.get('___refresh')).toBeUndefined();

          done();
        }
      });

      tokenObject.set({
        'auth': {
          'token': 'tampered_',
          'type': 'Bearer',
        },
        'userState': {
          'a': 'b',
        },
      });
    }, 10000);

    it('Setting up new expired token and new state', (done)=>{
      expect(Cookies.get('__')).toBe(oldToken);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(oldToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': null,
        'userState': null,
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('__')).toBe(oldToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('__')).toBeUndefined();
          expect(Cookies.get('___type')).toBeUndefined();
          expect(Cookies.get('___state')).toBeUndefined();
          expect(Cookies.get('___refresh')).toBeUndefined();

          done();
        }
      });

      tokenObject.set({
        'auth': {
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY'+
          '3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo5NzE0OTc5OTV9.LTw5GVQ3Y4h'+
          '35tZ6HMSS5fRh8hknu3vM1bN7wx4DvM0',
          'type': 'Bearer',
        },
        'userState': {
          'a': 'b',
        },
      });
    }, 10000);

    it('Removing Auth Token', (done)=>{
      expect(Cookies.get('__')).toBe(oldToken);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(oldToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': null,
        'userState': null,
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('__')).toBe(oldToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('__')).toBeUndefined();
          expect(Cookies.get('___type')).toBeUndefined();
          expect(Cookies.get('___state')).toBeUndefined();
          expect(Cookies.get('___refresh')).toBeUndefined();

          done();
        }
      });

      tokenObject.set({
        'auth': null,
      });
    }, 10000);

    // / Refresh

    it('Setting up new Refresh token', (done) => {
      expect(Cookies.get('__')).toBe(oldToken);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(oldToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': newToken,
          'expiresAt': new Date(newExp * 1000),
        },
        'userState': {},
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('__')).toBe(oldToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('__')).toBe(oldToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(newToken);

          done();
        }
      });

      tokenObject.set({
        refresh: newToken,
      });
    }, 10000);

    it('Setting up new tampered Refresh token', (done)=>{
      expect(Cookies.get('__')).toBe(oldToken);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(oldToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': null,
        'userState': null,
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('__')).toBe(oldToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);
          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('__')).toBeUndefined();
          expect(Cookies.get('___type')).toBeUndefined();
          expect(Cookies.get('___state')).toBeUndefined();
          expect(Cookies.get('___refresh')).toBeUndefined();

          done();
        }
      });

      tokenObject.set({
        refresh: 'tempered_',
      });
    }, 10000);

    it('Setting up new expired Refresh token', (done)=>{
      expect(Cookies.get('__')).toBe(oldToken);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(oldToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': null,
        'userState': null,
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('__')).toBe(oldToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('__')).toBeUndefined();
          expect(Cookies.get('___type')).toBeUndefined();
          expect(Cookies.get('___state')).toBeUndefined();
          expect(Cookies.get('___refresh')).toBeUndefined();

          done();
        }
      });

      tokenObject.set({
        refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3O'+
        'DkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo5NzE0OTc5OTV9.LTw5GVQ3Y4h35tZ'+
        '6HMSS5fRh8hknu3vM1bN7wx4DvM0',
      });
    }, 10000);

    it('Removing Refresh Token', (done)=>{
      expect(Cookies.get('__')).toBe(oldToken);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(oldToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': null,
        'userState': {},
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('__')).toBe(oldToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('__')).toBe(oldToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBeUndefined();

          done();
        }
      });

      tokenObject.set({
        'refresh': null,
      });
    }, 10000);

    it('Setting up new Auth and Refresh token', (done) => {
      expect(Cookies.get('__')).toBe(oldToken);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(oldToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': newToken,
          'type': 'Bearer',
          'expiresAt': new Date(newExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': newToken,
          'expiresAt': new Date(newExp * 1000),
        },
        'userState': {},
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('__')).toBe(oldToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('__')).toBe(newToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(newToken);

          done();
        }
      });

      tokenObject.set({
        'auth': {
          'token': newToken,
          'type': 'Bearer',
        },
        'refresh': newToken,
      });
    }, 10000);

    it('Setting up new Refresh token and new state', (done)=>{
      expect(Cookies.get('__')).toBe(oldToken);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(oldToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': newToken,
          'expiresAt': new Date(newExp * 1000),
        },
        'userState': {
          'a': 'b',
        },
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('__')).toBe(oldToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('__')).toBe(oldToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{"a":"b"}');
          expect(Cookies.get('___refresh')).toBe(newToken);

          done();
        }
      });

      tokenObject.set({
        'refresh': newToken,
        'userState': {
          'a': 'b',
        },
      });
    }, 10000);

    it('Setting up new Auth token, Refresh token and new state', (done)=>{
      expect(Cookies.get('__')).toBe(oldToken);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(oldToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': newToken,
          'type': 'Bearer',
          'expiresAt': new Date(newExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': newToken,
          'expiresAt': new Date(newExp * 1000),
        },
        'userState': {},
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('__')).toBe(oldToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('__')).toBe(newToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(newToken);

          done();
        }
      });

      tokenObject.set({
        'auth': {
          'token': newToken,
          'type': 'Bearer',
        },
        'refresh': newToken,
      });
    }, 10000);

    it('Setting up new Refresh token and new state', (done)=>{
      expect(Cookies.get('__')).toBe(oldToken);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(oldToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'cookie',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': newToken,
          'type': 'Bearer',
          'expiresAt': new Date(newExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': newToken,
          'expiresAt': new Date(newExp * 1000),
        },
        'userState': {
          'a': 'b',
        },
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('__')).toBe(oldToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('__')).toBe(newToken);
          expect(Cookies.get('___type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{"a":"b"}');
          expect(Cookies.get('___refresh')).toBe(newToken);

          done();
        }
      });

      tokenObject.set({
        'refresh': newToken,
        'auth': {
          token: newToken,
          type: 'Bearer',
        },
        'userState': {
          'a': 'b',
        },
      });
    }, 10000);
  });

  describe('Using LocalStorage', () => {
    const oldToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
    '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw603AjpA'+
    'qNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
    const oldExp = 8008605195;

    const newToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0'+
    'NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxMTE2NDY0ODI1Nn0.Vf-miK3nrkJ'+
    '1svSRu_4AHmPxVPceN6GqESN7rsffLmg';
    const newExp = 11164648256;

    let subscribeCount: number;
    beforeEach(() => {
      subscribeCount = 0;
      localStorage.setItem('__', oldToken);
      localStorage.setItem('___type', 'Bearer');
      localStorage.setItem('___state', '{}');
      localStorage.setItem('___refresh', oldToken);
    });

    afterEach(() => {
      localStorage.removeItem('__');
      localStorage.removeItem('___type');
      localStorage.removeItem('___state');
      localStorage.removeItem('___refresh');
    });

    it('Setting up new Auth token', (done) => {
      expect(localStorage.getItem('__')).toBe(oldToken);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');
      expect(localStorage.getItem('___refresh')).toBe(oldToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': newToken,
          'type': 'Bearer',
          'expiresAt': new Date(newExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(localStorage.getItem('__')).toBe(oldToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{}');
          expect(localStorage.getItem('___refresh')).toBe(oldToken);
          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(localStorage.getItem('__')).toBe(newToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{}');
          expect(localStorage.getItem('___refresh')).toBe(oldToken);

          done();
        }
      });

      tokenObject.set({
        'auth': {
          'token': newToken,
          'type': 'Bearer',
        },
      });
    }, 10000);

    it('Setting up new User State', (done) => {
      expect(localStorage.getItem('__')).toBe(oldToken);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');
      expect(localStorage.getItem('___refresh')).toBe(oldToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {
          'a': 'b',
        },
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(localStorage.getItem('__')).toBe(oldToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{}');
          expect(localStorage.getItem('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(localStorage.getItem('__')).toBe(oldToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{"a":"b"}');
          expect(localStorage.getItem('___refresh')).toBe(oldToken);

          done();
        }
      });

      tokenObject.set({
        userState: {
          'a': 'b',
        },
      });
    }, 10000);

    it('Setting up new token and new state', (done)=>{
      expect(localStorage.getItem('__')).toBe(oldToken);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');
      expect(localStorage.getItem('___refresh')).toBe(oldToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': newToken,
          'type': 'Bearer',
          'expiresAt': new Date(newExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {
          'a': 'b',
        },
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(localStorage.getItem('__')).toBe(oldToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{}');
          expect(localStorage.getItem('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(localStorage.getItem('__')).toBe(newToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{"a":"b"}');
          expect(localStorage.getItem('___refresh')).toBe(oldToken);

          done();
        }
      });

      tokenObject.set({
        'auth': {
          'token': newToken,
          'type': 'Bearer',
        },
        'userState': {
          'a': 'b',
        },
      });
    }, 10000);

    it('Setting up new tampered token and new state', (done)=>{
      expect(localStorage.getItem('__')).toBe(oldToken);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');
      expect(localStorage.getItem('___refresh')).toBe(oldToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': null,
        'userState': null,
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(localStorage.getItem('__')).toBe(oldToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{}');
          expect(localStorage.getItem('___refresh')).toBe(oldToken);
          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(localStorage.getItem('__')).toBeNull();
          expect(localStorage.getItem('___type')).toBeNull();
          expect(localStorage.getItem('___state')).toBeNull();
          expect(localStorage.getItem('___refresh')).toBeNull();

          done();
        }
      });

      tokenObject.set({
        'auth': {
          'token': 'tampered_',
          'type': 'Bearer',
        },
        'userState': {
          'a': 'b',
        },
      });
    }, 10000);

    it('Setting up new expired token and new state', (done)=>{
      expect(localStorage.getItem('__')).toBe(oldToken);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');
      expect(localStorage.getItem('___refresh')).toBe(oldToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': null,
        'userState': null,
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(localStorage.getItem('__')).toBe(oldToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{}');
          expect(localStorage.getItem('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(localStorage.getItem('__')).toBeNull();
          expect(localStorage.getItem('___type')).toBeNull();
          expect(localStorage.getItem('___state')).toBeNull();
          expect(localStorage.getItem('___refresh')).toBeNull();

          done();
        }
      });

      tokenObject.set({
        'auth': {
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY'+
          '3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo5NzE0OTc5OTV9.LTw5GVQ3Y4h'+
          '35tZ6HMSS5fRh8hknu3vM1bN7wx4DvM0',
          'type': 'Bearer',
        },
        'userState': {
          'a': 'b',
        },
      });
    }, 10000);

    it('Removing Auth Token', (done)=>{
      expect(localStorage.getItem('__')).toBe(oldToken);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');
      expect(localStorage.getItem('___refresh')).toBe(oldToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': null,
        'userState': null,
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(localStorage.getItem('__')).toBe(oldToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{}');
          expect(localStorage.getItem('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(localStorage.getItem('__')).toBeNull();
          expect(localStorage.getItem('___type')).toBeNull();
          expect(localStorage.getItem('___state')).toBeNull();
          expect(localStorage.getItem('___refresh')).toBeNull();

          done();
        }
      });

      tokenObject.set({
        'auth': null,
      });
    }, 10000);

    // / Refresh

    it('Setting up new Refresh token', (done) => {
      expect(localStorage.getItem('__')).toBe(oldToken);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');
      expect(localStorage.getItem('___refresh')).toBe(oldToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': newToken,
          'expiresAt': new Date(newExp * 1000),
        },
        'userState': {},
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(localStorage.getItem('__')).toBe(oldToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{}');
          expect(localStorage.getItem('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(localStorage.getItem('__')).toBe(oldToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{}');
          expect(localStorage.getItem('___refresh')).toBe(newToken);

          done();
        }
      });

      tokenObject.set({
        refresh: newToken,
      });
    }, 10000);

    it('Setting up new tampered Refresh token', (done)=>{
      expect(localStorage.getItem('__')).toBe(oldToken);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');
      expect(localStorage.getItem('___refresh')).toBe(oldToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': null,
        'userState': null,
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(localStorage.getItem('__')).toBe(oldToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{}');
          expect(localStorage.getItem('___refresh')).toBe(oldToken);
          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(localStorage.getItem('__')).toBeNull();
          expect(localStorage.getItem('___type')).toBeNull();
          expect(localStorage.getItem('___state')).toBeNull();
          expect(localStorage.getItem('___refresh')).toBeNull();

          done();
        }
      });

      tokenObject.set({
        refresh: 'tempered_',
      });
    }, 10000);

    it('Setting up new expired Refresh token', (done)=>{
      expect(localStorage.getItem('__')).toBe(oldToken);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');
      expect(localStorage.getItem('___refresh')).toBe(oldToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': null,
        'userState': null,
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(localStorage.getItem('__')).toBe(oldToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{}');
          expect(localStorage.getItem('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(localStorage.getItem('__')).toBeNull();
          expect(localStorage.getItem('___type')).toBeNull();
          expect(localStorage.getItem('___state')).toBeNull();
          expect(localStorage.getItem('___refresh')).toBeNull();

          done();
        }
      });

      tokenObject.set({
        refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3O'+
        'DkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo5NzE0OTc5OTV9.LTw5GVQ3Y4h35tZ'+
        '6HMSS5fRh8hknu3vM1bN7wx4DvM0',
      });
    }, 10000);

    it('Removing Refresh Token', (done)=>{
      expect(localStorage.getItem('__')).toBe(oldToken);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');
      expect(localStorage.getItem('___refresh')).toBe(oldToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': null,
        'userState': {},
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(localStorage.getItem('__')).toBe(oldToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{}');
          expect(localStorage.getItem('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(localStorage.getItem('__')).toBe(oldToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{}');
          expect(localStorage.getItem('___refresh')).toBeNull();

          done();
        }
      });

      tokenObject.set({
        'refresh': null,
      });
    }, 10000);

    it('Setting up new Auth and Refresh token', (done) => {
      expect(localStorage.getItem('__')).toBe(oldToken);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');
      expect(localStorage.getItem('___refresh')).toBe(oldToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': newToken,
          'type': 'Bearer',
          'expiresAt': new Date(newExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': newToken,
          'expiresAt': new Date(newExp * 1000),
        },
        'userState': {},
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(localStorage.getItem('__')).toBe(oldToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{}');
          expect(localStorage.getItem('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(localStorage.getItem('__')).toBe(newToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{}');
          expect(localStorage.getItem('___refresh')).toBe(newToken);

          done();
        }
      });

      tokenObject.set({
        'auth': {
          'token': newToken,
          'type': 'Bearer',
        },
        'refresh': newToken,
      });
    }, 10000);

    it('Setting up new Refresh token and new state', (done)=>{
      expect(localStorage.getItem('__')).toBe(oldToken);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');
      expect(localStorage.getItem('___refresh')).toBe(oldToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': newToken,
          'expiresAt': new Date(newExp * 1000),
        },
        'userState': {
          'a': 'b',
        },
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(localStorage.getItem('__')).toBe(oldToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{}');
          expect(localStorage.getItem('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(localStorage.getItem('__')).toBe(oldToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{"a":"b"}');
          expect(localStorage.getItem('___refresh')).toBe(newToken);

          done();
        }
      });

      tokenObject.set({
        'refresh': newToken,
        'userState': {
          'a': 'b',
        },
      });
    }, 10000);

    it('Setting up new Auth token, Refresh token and new state', (done)=>{
      expect(localStorage.getItem('__')).toBe(oldToken);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');
      expect(localStorage.getItem('___refresh')).toBe(oldToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': newToken,
          'type': 'Bearer',
          'expiresAt': new Date(newExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': newToken,
          'expiresAt': new Date(newExp * 1000),
        },
        'userState': {},
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(localStorage.getItem('__')).toBe(oldToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{}');
          expect(localStorage.getItem('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(localStorage.getItem('__')).toBe(newToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{}');
          expect(localStorage.getItem('___refresh')).toBe(newToken);

          done();
        }
      });

      tokenObject.set({
        'auth': {
          'token': newToken,
          'type': 'Bearer',
        },
        'refresh': newToken,
      });
    }, 10000);

    it('Setting up new Refresh token and new state', (done)=>{
      expect(localStorage.getItem('__')).toBe(oldToken);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');
      expect(localStorage.getItem('___refresh')).toBe(oldToken);


      const tokenObject = new TokenObject<object>(
          '__',
          'localstorage',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': newToken,
          'type': 'Bearer',
          'expiresAt': new Date(newExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': newToken,
          'expiresAt': new Date(newExp * 1000),
        },
        'userState': {
          'a': 'b',
        },
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(localStorage.getItem('__')).toBe(oldToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{}');
          expect(localStorage.getItem('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(localStorage.getItem('__')).toBe(newToken);
          expect(localStorage.getItem('___type')).toBe('Bearer');
          expect(localStorage.getItem('___state')).toBe('{"a":"b"}');
          expect(localStorage.getItem('___refresh')).toBe(newToken);

          done();
        }
      });

      tokenObject.set({
        'refresh': newToken,
        'auth': {
          token: newToken,
          type: 'Bearer',
        },
        'userState': {
          'a': 'b',
        },
      });
    }, 10000);
  });
});
