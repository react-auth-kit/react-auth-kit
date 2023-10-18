import Cookies from 'js-cookie';
import TokenObject from '../RxTokenObject';

describe('Initial Value [Without Refresh Token]', () => {
  it('No Existing cookie is there', () => {
    const subscriber = jest.fn()
    expect(subscriber.mock.calls).toHaveLength(0);

    const tokenObject = new TokenObject<object>(
      '__',
      'cookie',
      null,
      window.location.hostname,
      window.location.protocol === 'https:',
    );

    tokenObject.subscribe(subscriber);

    expect(tokenObject.value).toMatchObject({ "auth": null, "isSignIn": false, "isUsingRefreshToken": false, "refresh": null, "userState": null });
    expect(subscriber).toBeCalled();
    expect(subscriber.mock.calls).toHaveLength(1);
    expect(subscriber).toHaveBeenCalledWith({ "auth": null, "isSignIn": false, "isUsingRefreshToken": false, "refresh": null, "userState": null });
  });

  it('No Existing Local Storage is there', () => {
    const subscriber = jest.fn()
    expect(subscriber.mock.calls).toHaveLength(0);

    const tokenObject = new TokenObject<object>(
      '__',
      'localstorage',
      null
    );

    tokenObject.subscribe(subscriber);

    expect(tokenObject.value).toMatchObject({ "auth": null, "isSignIn": false, "isUsingRefreshToken": false, "refresh": null, "userState": null });
    expect(subscriber).toBeCalled();
    expect(subscriber.mock.calls).toHaveLength(1);
    expect(subscriber).toHaveBeenCalledWith({ "auth": null, "isSignIn": false, "isUsingRefreshToken": false, "refresh": null, "userState": null });
  });

  describe('Existing Cookies are there', () => {

    beforeEach(() => {
      Cookies.set('___type', 'Bearer');
      Cookies.set('___state', '{}');
    })

    afterEach(() => {
      Cookies.remove('__');
      Cookies.remove('___type');
      Cookies.remove('___state');
    });

    it('Existing Cookies are there', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo4MDA4NjA1MTk1fQ.E0EVT_4KVJHPEnC8XmukxiRRcAIo31U9wWW99RVQumA'
      Cookies.set('__', token);

      const subscriber = jest.fn()
      expect(subscriber.mock.calls).toHaveLength(0);

      const tokenObject = new TokenObject<object>(
        '__',
        'cookie',
        null,
        window.location.hostname,
        window.location.protocol === 'https:',
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        "auth": {
          'token': token,
          'type': 'Bearer',
          'expiresAt': new Date(8008605195 * 1000),
        },
        "isSignIn": true,
        "isUsingRefreshToken": false,
        "refresh": null,
        "userState": {}
      }

      expect(tokenObject.value).toMatchObject(resp);
      expect(subscriber).toBeCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Cookie is not a proper JWT', () => {
      const token = 'tampered_'
      Cookies.set('__', token);

      const subscriber = jest.fn()
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(Cookies.get('__')).toBe(token)
      expect(Cookies.get('___type')).toBe('Bearer')
      expect(Cookies.get('___state')).toBe('{}')

      const tokenObject = new TokenObject<object>(
        '__',
        'cookie',
        null,
        window.location.hostname,
        window.location.protocol === 'https:',
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        "auth": null,
        "isSignIn": false,
        "isUsingRefreshToken": false,
        "refresh": null,
        "userState": null
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
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.Gfx6VO9tcxwk6xqx9yYzSfebfeakZp5JYIgP_edcw_A'
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
        window.location.hostname,
        window.location.protocol === 'https:',
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        "auth": null,
        "isSignIn": false,
        "isUsingRefreshToken": false,
        "refresh": null,
        "userState": null
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
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo5NzE0OTc5OTV9.XJbNAE-aRz7tO7tSHiUlMGGuUrAELPPkNITKVlNZ8DA'
      Cookies.set('__', token);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      const tokenObject = new TokenObject<object>(
        '__',
        'cookie',
        null,
        window.location.hostname,
        window.location.protocol === 'https:',
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        "auth": null,
        "isSignIn": false,
        "isUsingRefreshToken": false,
        "refresh": null,
        "userState": null
      }

      expect(tokenObject.value).toMatchObject(resp);

      expect(Cookies.get('__')).toBeUndefined();
      expect(Cookies.get('___type')).toBeUndefined();
      expect(Cookies.get('___state')).toBeUndefined();

      expect(subscriber).toBeCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });
  });

  describe('Using Local Storage', () => {

    beforeEach(() => {
      localStorage.setItem('___type', 'Bearer');
      localStorage.setItem('___state', '{}');
    })

    afterEach(() => {
      localStorage.removeItem('__');
      localStorage.removeItem('___type');
      localStorage.removeItem('___state');
    });

    it('Existing Local Storage are there', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo4MDA4NjA1MTk1fQ.E0EVT_4KVJHPEnC8XmukxiRRcAIo31U9wWW99RVQumA'
      localStorage.setItem('__', token);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      const tokenObject = new TokenObject<object>(
        '__',
        'localstorage',
        null,
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        "auth": {
          'token': token,
          'type': 'Bearer',
          'expiresAt': new Date(8008605195 * 1000),
        },
        "isSignIn": true,
        "isUsingRefreshToken": false,
        "refresh": null,
        "userState": {}
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
      const token = 'tampered_'
      localStorage.setItem('__', token);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(localStorage.getItem('__')).toBe(token)
      expect(localStorage.getItem('___type')).toBe('Bearer')
      expect(localStorage.getItem('___state')).toBe('{}')

      const tokenObject = new TokenObject<object>(
        '__',
        'localstorage',
        null
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        "auth": null,
        "isSignIn": false,
        "isUsingRefreshToken": false,
        "refresh": null,
        "userState": null
      };

      expect(tokenObject.value).toMatchObject(resp);
      expect(localStorage.getItem('__')).toBeNull();
      expect(localStorage.getItem('___type')).toBeNull();
      expect(localStorage.getItem('___state')).toBeNull();

      expect(subscriber).toBeCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Local Storage JWT has no iat param', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.Gfx6VO9tcxwk6xqx9yYzSfebfeakZp5JYIgP_edcw_A'
      localStorage.setItem('__', token);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(localStorage.getItem('__')).toBe(token)
      expect(localStorage.getItem('___type')).toBe('Bearer')
      expect(localStorage.getItem('___state')).toBe('{}')

      const tokenObject = new TokenObject<object>(
        '__',
        'localstorage',
        null
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        "auth": null,
        "isSignIn": false,
        "isUsingRefreshToken": false,
        "refresh": null,
        "userState": null
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
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo5NzE0OTc5OTV9.XJbNAE-aRz7tO7tSHiUlMGGuUrAELPPkNITKVlNZ8DA'
      localStorage.setItem('__', token);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      const tokenObject = new TokenObject<object>(
        '__',
        'localstorage',
        null
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        "auth": null,
        "isSignIn": false,
        "isUsingRefreshToken": false,
        "refresh": null,
        "userState": null
      }

      expect(tokenObject.value).toMatchObject(resp);

      expect(localStorage.getItem('__')).toBeNull();
      expect(localStorage.getItem('___type')).toBeNull();
      expect(localStorage.getItem('___state')).toBeNull();

      expect(subscriber).toBeCalled();
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
      window.location.hostname,
      window.location.protocol === 'https:',
    );

    tokenObject.subscribe(subscriber);

    expect(tokenObject.value).toMatchObject({ "auth": null, "isSignIn": false, "isUsingRefreshToken": true, "refresh": null, "userState": null });
    expect(subscriber).toBeCalled();
    expect(subscriber.mock.calls).toHaveLength(1);
    expect(subscriber).toHaveBeenCalledWith({ "auth": null, "isSignIn": false, "isUsingRefreshToken": true, "refresh": null, "userState": null });
  });

  it('No Existing Local Storage is there', () => {
    const subscriber = jest.fn();
    expect(subscriber.mock.calls).toHaveLength(0);

    const tokenObject = new TokenObject<object>(
      '__',
      'localstorage',
      '__re'
    );

    tokenObject.subscribe(subscriber);

    expect(tokenObject.value).toMatchObject({ "auth": null, "isSignIn": false, "isUsingRefreshToken": true, "refresh": null, "userState": null });
    expect(subscriber).toBeCalled();
    expect(subscriber.mock.calls).toHaveLength(1);
    expect(subscriber).toHaveBeenCalledWith({ "auth": null, "isSignIn": false, "isUsingRefreshToken": true, "refresh": null, "userState": null });
  });

  describe('Existing Cookies are there', () => {

    beforeEach(() => {
      Cookies.set('___type', 'Bearer');
      Cookies.set('___state', '{}');
    })

    afterEach(() => {
      Cookies.remove('__');
      Cookies.remove('___type');
      Cookies.remove('___state');
      Cookies.remove('__re');
    });

    it('Existing Cookies are there', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo4MDA4NjA1MTk1fQ.E0EVT_4KVJHPEnC8XmukxiRRcAIo31U9wWW99RVQumA'
      Cookies.set('__', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo4MDA4NjIwODYzfQ.pXpDIqK20WJgkzMLbR7yjL4VD-NBMYsOVptOGR7Wf2E'
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
        window.location.hostname,
        window.location.protocol === 'https:',
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        "auth": {
          'token': token,
          'type': 'Bearer',
          'expiresAt': new Date(8008605195 * 1000),
        },
        "isSignIn": true,
        "isUsingRefreshToken": true,
        "refresh": {
          'token': refreshToken,
          'expiresAt': new Date(8008620863 * 1000)
        },
        "userState": {}
      }

      expect(tokenObject.value).toMatchObject(resp);

      expect(Cookies.get('__')).toBe(token);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('__re')).toBe(refreshToken);

      expect(subscriber).toBeCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Cookie is not a proper JWT but Refresh Token is a proper JWT', () => {
      const token = 'tampered_'
      Cookies.set('__', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo4MDA4NjIwODYzfQ.pXpDIqK20WJgkzMLbR7yjL4VD-NBMYsOVptOGR7Wf2E'
      Cookies.set('__re', refreshToken);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(Cookies.get('__')).toBe(token)
      expect(Cookies.get('___type')).toBe('Bearer')
      expect(Cookies.get('___state')).toBe('{}')
      expect(Cookies.get('__re')).toBe(refreshToken)


      const tokenObject = new TokenObject<object>(
        '__',
        'cookie',
        '__re',
        window.location.hostname,
        window.location.protocol === 'https:',
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        "auth": null,
        "isSignIn": false,
        "isUsingRefreshToken": true,
        "refresh": {
          'token': refreshToken,
          'expiresAt': new Date(8008620863 * 1000)
        },
        "userState": null
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

    it('Existing Auth Cookie JWT has no iat param but Refresh Token is a proper JWT', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.Gfx6VO9tcxwk6xqx9yYzSfebfeakZp5JYIgP_edcw_A'
      Cookies.set('__', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo4MDA4NjIwODYzfQ.pXpDIqK20WJgkzMLbR7yjL4VD-NBMYsOVptOGR7Wf2E'
      Cookies.set('__re', refreshToken);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(Cookies.get('__')).toBe(token)
      expect(Cookies.get('___type')).toBe('Bearer')
      expect(Cookies.get('___state')).toBe('{}')
      expect(Cookies.get('__re')).toBe(refreshToken)


      const tokenObject = new TokenObject<object>(
        '__',
        'cookie',
        '__re',
        window.location.hostname,
        window.location.protocol === 'https:',
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        "auth": null,
        "isSignIn": false,
        "isUsingRefreshToken": true,
        "refresh": {
          'token': refreshToken,
          'expiresAt': new Date(8008620863 * 1000)
        },
        "userState": null
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
      const token = 'tampered_'
      Cookies.set('__', token);

      const refreshToken = 'tempered__'
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
        window.location.hostname,
        window.location.protocol === 'https:',
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        "auth": null,
        "isSignIn": false,
        "isUsingRefreshToken": true,
        "refresh": null,
        "userState": null
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

    it('Existing Auth Cookie and Refresh Cookies JWT both are not have iat param', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.Gfx6VO9tcxwk6xqx9yYzSfebfeakZp5JYIgP_edcw_A'
      Cookies.set('__', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.Gfx6VO9tcxwk6xqx9yYzSfebfeakZp5JYIgP_edcw_A'
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
        window.location.hostname,
        window.location.protocol === 'https:',
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        "auth": null,
        "isSignIn": false,
        "isUsingRefreshToken": true,
        "refresh": null,
        "userState": null
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

    it('Existing Auth Cookie was already expired but Refresh Cookie is not expired', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo5NzE0OTc5OTV9.XJbNAE-aRz7tO7tSHiUlMGGuUrAELPPkNITKVlNZ8DA'
      Cookies.set('__', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo4MDA4NjIwODYzfQ.pXpDIqK20WJgkzMLbR7yjL4VD-NBMYsOVptOGR7Wf2E'
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
        window.location.hostname,
        window.location.protocol === 'https:',
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        "auth": null,
        "isSignIn": false,
        "isUsingRefreshToken": true,
        "refresh": {
          'token': refreshToken,
          'expiresAt': new Date(8008620863 * 1000)
        },
        "userState": null
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
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo5NzE0OTc5OTV9.XJbNAE-aRz7tO7tSHiUlMGGuUrAELPPkNITKVlNZ8DA'
      Cookies.set('__', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo5NzE0OTc5OTV9.XJbNAE-aRz7tO7tSHiUlMGGuUrAELPPkNITKVlNZ8DA'
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
        window.location.hostname,
        window.location.protocol === 'https:',
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        "auth": null,
        "isSignIn": false,
        "isUsingRefreshToken": true,
        "refresh": null,
        "userState": null
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
    })

    afterEach(() => {
      localStorage.removeItem('__');
      localStorage.removeItem('___type');
      localStorage.removeItem('___state');
      localStorage.removeItem('__re');
    });

    it('Existing Local Storage are there', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo4MDA4NjA1MTk1fQ.E0EVT_4KVJHPEnC8XmukxiRRcAIo31U9wWW99RVQumA'
      localStorage.setItem('__', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo4MDA4NjIwODYzfQ.pXpDIqK20WJgkzMLbR7yjL4VD-NBMYsOVptOGR7Wf2E'
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
        '__re'
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        "auth": {
          'token': token,
          'type': 'Bearer',
          'expiresAt': new Date(8008605195 * 1000),
        },
        "isSignIn": true,
        "isUsingRefreshToken": true,
        "refresh": {
          'token': refreshToken,
          'expiresAt': new Date(8008620863 * 1000)
        },
        "userState": {}
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

    it('Existing Auth Token is not a proper JWT but Refresh Token is a proper JWT', () => {
      const token = 'tampered_'
      localStorage.setItem('__', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo4MDA4NjIwODYzfQ.pXpDIqK20WJgkzMLbR7yjL4VD-NBMYsOVptOGR7Wf2E'
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
        '__re'
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        "auth": null,
        "isSignIn": false,
        "isUsingRefreshToken": true,
        "refresh": {
          'token': refreshToken,
          'expiresAt': new Date(8008620863 * 1000)
        },
        "userState": null
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

    it('Existing Auth Token JWT has no iat param but Refresh Token is a proper JWT', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.Gfx6VO9tcxwk6xqx9yYzSfebfeakZp5JYIgP_edcw_A'
      localStorage.setItem('__', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo4MDA4NjIwODYzfQ.pXpDIqK20WJgkzMLbR7yjL4VD-NBMYsOVptOGR7Wf2E'
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
        '__re'
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        "auth": null,
        "isSignIn": false,
        "isUsingRefreshToken": true,
        "refresh": {
          'token': refreshToken,
          'expiresAt': new Date(8008620863 * 1000)
        },
        "userState": null
      }

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
      const token = 'tampered_'
      localStorage.setItem('__', token);

      const refreshToken = 'tempered__'
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
        '__re'
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        "auth": null,
        "isSignIn": false,
        "isUsingRefreshToken": true,
        "refresh": null,
        "userState": null
      }

      expect(tokenObject.value).toMatchObject(resp);

      expect(localStorage.getItem('__')).toBeNull();
      expect(localStorage.getItem('___type')).toBeNull();
      expect(localStorage.getItem('___state')).toBeNull();
      expect(localStorage.getItem('__re')).toBeNull();

      expect(subscriber).toBeCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Token and Refresh Token JWT are not have iat param', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.Gfx6VO9tcxwk6xqx9yYzSfebfeakZp5JYIgP_edcw_A'
      localStorage.setItem('__', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.Gfx6VO9tcxwk6xqx9yYzSfebfeakZp5JYIgP_edcw_A'
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
        '__re'
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        "auth": null,
        "isSignIn": false,
        "isUsingRefreshToken": true,
        "refresh": null,
        "userState": null
      }

      expect(tokenObject.value).toMatchObject(resp);

      expect(localStorage.getItem('__')).toBeNull();
      expect(localStorage.getItem('___type')).toBeNull();
      expect(localStorage.getItem('___state')).toBeNull();
      expect(localStorage.getItem('__re')).toBeNull();

      expect(subscriber).toBeCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Token was already expired but Refresh Token is not expired', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo5NzE0OTc5OTV9.XJbNAE-aRz7tO7tSHiUlMGGuUrAELPPkNITKVlNZ8DA'
      localStorage.setItem('__', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo4MDA4NjIwODYzfQ.pXpDIqK20WJgkzMLbR7yjL4VD-NBMYsOVptOGR7Wf2E'
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
        '__re'
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        "auth": null,
        "isSignIn": false,
        "isUsingRefreshToken": true,
        "refresh": {
          'token': refreshToken,
          'expiresAt': new Date(8008620863 * 1000)
        },
        "userState": null
      }

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
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo5NzE0OTc5OTV9.XJbNAE-aRz7tO7tSHiUlMGGuUrAELPPkNITKVlNZ8DA'
      localStorage.setItem('__', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo5NzE0OTc5OTV9.XJbNAE-aRz7tO7tSHiUlMGGuUrAELPPkNITKVlNZ8DA'
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
        '__re'
      );

      tokenObject.subscribe(subscriber);

      const resp = {
        "auth": null,
        "isSignIn": false,
        "isUsingRefreshToken": true,
        "refresh": null,
        "userState": null
      }

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

// describe('Set New Value [Without Refresh Token]', () => {
//   describe('No existing Value is present [Using Cookie]', () => {
//     const old_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo4MDA4NjA1MTk1fQ.E0EVT_4KVJHPEnC8XmukxiRRcAIo31U9wWW99RVQumA';
//     const old_exp = 8008605195;

//     const new_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxMTE2NDY0ODI1NiwiZXhwIjoxMTE2NDY0ODI1Nn0.FZ5Fhw9izxIR2lQMI3LYOP_Bnfo16289V5ZW5_o2dcM';
//     const new_exp = 11164648256;

//     beforeEach(() => {
//       Cookies.set('__', old_token);
//       Cookies.set('___type', 'Bearer');
//       Cookies.set('___state', '{}');
//     })

//     afterEach(() => {
//       Cookies.remove('__');
//       Cookies.remove('___type');
//       Cookies.remove('___state');
//     });

//     it("Setting up new token", (done) => {
//       const subscriber = jest.fn()
//       expect(subscriber.mock.calls).toHaveLength(0);

//       expect(Cookies.get('__')).toBe(old_token);
//       expect(Cookies.get('___type')).toBe('Bearer');
//       expect(Cookies.get('___state')).toBe('{}');

//       const tokenObject = new TokenObject<object>(
//         '__',
//         'cookie',
//         null,
//         window.location.hostname,
//         window.location.protocol === 'https:',
//       );

//       // tokenObject.subscribe(subscriber);
//       tokenObject.observe().subscribe(subscriber);


//       const resp = {
//         "auth": {
//           'token': old_token,
//           'type': 'Bearer',
//           'expiresAt': new Date(old_exp * 1000),
//         },
//         "isSignIn": true,
//         "isUsingRefreshToken": false,
//         "refresh": null,
//         "userState": {}
//       }


//       expect(Cookies.get('__')).toBe(old_token);
//       expect(Cookies.get('___type')).toBe('Bearer');
//       expect(Cookies.get('___state')).toBe('{}');

//       expect(tokenObject.value).toMatchObject(resp);
//       expect(subscriber).toBeCalled();
//       expect(subscriber.mock.calls).toHaveLength(1);
//       expect(subscriber).toHaveBeenCalledWith(resp);

//       tokenObject.set({
//         "auth": {
//           'token': new_token,
//           'type': 'Bearer',
//         }
//       });

//       const new_resp = {
//         "auth": {
//           'token': new_token,
//           'type': 'Bearer',
//           'expiresAt': new Date(new_exp * 1000),
//         },
//         "isSignIn": true,
//         "isUsingRefreshToken": false,
//         "refresh": null,
//         "userState": {}
//       }

//       setTimeout(() => {
//         // Check if both subscribers were called with the updated value
        
//         expect(subscriber).toBeCalled();
//         expect(subscriber).toBeCalledWith(new_resp);
//         expect(tokenObject.value).toMatchObject(new_resp);

//         expect(Cookies.get('__')).toBe(new_token);
//         expect(Cookies.get('___type')).toBe('Bearer');
//         expect(Cookies.get('___state')).toBe('{}');
//         done();
//       }, 0);
//     });

    // it("Setting up new User State", (done) => {
    //   const subscriber = jest.fn()
    //   expect(subscriber.mock.calls).toHaveLength(0);

    //   expect(Cookies.get('__')).toBe(old_token);
    //   expect(Cookies.get('___type')).toBe('Bearer');
    //   expect(Cookies.get('___state')).toBe('{}');

    //   const tokenObject = new TokenObject<object>(
    //     '__',
    //     'cookie',
    //     null,
    //     window.location.hostname,
    //     window.location.protocol === 'https:',
    //   );

    //   tokenObject.subscribe(subscriber, (err) => {
    //     console.log(err)
    //   });

    //   const resp = {
    //     "auth": {
    //       'token': old_token,
    //       'type': 'Bearer',
    //       'expiresAt': new Date(old_exp * 1000),
    //     },
    //     "isSignIn": true,
    //     "isUsingRefreshToken": false,
    //     "refresh": null,
    //     "userState": {}
    //   }


    //   expect(Cookies.get('__')).toBe(old_token);
    //   expect(Cookies.get('___type')).toBe('Bearer');
    //   expect(Cookies.get('___state')).toBe('{}');

    //   expect(tokenObject.value).toMatchObject(resp);
    //   expect(subscriber).toBeCalled();
    //   expect(subscriber.mock.calls).toHaveLength(1);
    //   expect(subscriber).toHaveBeenCalledWith(resp);

    //   tokenObject.set({
    //     userState: {
    //       'a': 'b'
    //     }
    //   });

    //   const new_resp = {
    //     "auth": {
    //       'token': old_token,
    //       'type': 'Bearer',
    //       'expiresAt': new Date(old_exp * 1000),
    //     },
    //     "isSignIn": true,
    //     "isUsingRefreshToken": false,
    //     "refresh": null,
    //     "userState": {
    //       'a': 'b'
    //     }
    //   }

    //   setTimeout(() => {
    //     // Check if both subscribers were called with the updated value
    //     console.log("Timeout called");
        
    //     expect(subscriber.mock.calls).toHaveLength(2);
    //     expect(subscriber.mock.calls[1][0]).toMatchObject(new_resp);
    //     // expect(tokenObject.value).toMatchObject(new_resp);

    //     expect(Cookies.get('__')).toBe(old_exp);
    //     expect(Cookies.get('___type')).toBe('Bearer');
    //     expect(Cookies.get('___state')).toBe("{'a': 'b'}");
    //     console.log(Cookies.get('___state'))
    //     done();
    //   }, 0);
    // }, 10000);

  // });


  // describe('Existing Value is present', ()=>{

  // });
// });