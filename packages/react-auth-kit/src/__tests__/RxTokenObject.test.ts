import Cookies from 'js-cookie';
import TokenObject from '../RxTokenObject';

describe('Initial Value [Without Refresh Token]', () => {
  it('No Existing cookie is there', () => {
    const tokenObject = new TokenObject<object>(
      '__',
      'cookie',
      null,
      window.location.hostname,
      window.location.protocol === 'https:',
    );

    expect(tokenObject.value).toMatchObject({"auth": null, "isSignIn": false, "isUsingRefreshToken": false, "refresh": null, "userState": null})
  });

  it('No Existing Local Storage is there', () => {
    const tokenObject = new TokenObject<object>(
      '__',
      'localstorage',
      null
    );

    expect(tokenObject.value).toMatchObject({"auth": null, "isSignIn": false, "isUsingRefreshToken": false, "refresh": null, "userState": null})
  });

  describe('Existing Cookies are there', () => {

    beforeEach(()=>{
      Cookies.set('___type', 'Bearer');
      Cookies.set('___state', '{}');
    })

    afterEach(()=>{
      Cookies.remove('__');
      Cookies.remove('___type');
      Cookies.remove('___state');
    });
    
    it('Existing Cookies are there', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo4MDA4NjA1MTk1fQ.E0EVT_4KVJHPEnC8XmukxiRRcAIo31U9wWW99RVQumA'
      Cookies.set('__', token);

      const tokenObject = new TokenObject<object>(
        '__',
        'cookie',
        null,
        window.location.hostname,
        window.location.protocol === 'https:',
      );
      
      expect(tokenObject.value).toMatchObject(
        {
          "auth": {
            'token': token,
            'type': 'Bearer',
            'expiresAt': new Date(8008605195*1000),
          }, 
          "isSignIn": true, 
          "isUsingRefreshToken": false, 
          "refresh": null, 
          "userState": {}
        }
      )
    });

    it('Existing Auth Cookie is not a proper JWT', () => {
      const token = 'tampered_'
      Cookies.set('__', token);

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
      
      expect(tokenObject.value).toMatchObject(
        {
          "auth": null, 
          "isSignIn": false, 
          "isUsingRefreshToken": false, 
          "refresh": null, 
          "userState": null
        }
      )

      expect(Cookies.get('__')).toBeUndefined()
      expect(Cookies.get('___type')).toBeUndefined()
      expect(Cookies.get('___state')).toBeUndefined()

    });

    it('Existing Auth Cookie was expired', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo5NzE0OTc5OTV9.XJbNAE-aRz7tO7tSHiUlMGGuUrAELPPkNITKVlNZ8DA'
      Cookies.set('__', token);

      const tokenObject = new TokenObject<object>(
        '__',
        'cookie',
        null,
        window.location.hostname,
        window.location.protocol === 'https:',
      );
      
      expect(tokenObject.value).toMatchObject(
        {
          "auth": null, 
          "isSignIn": false, 
          "isUsingRefreshToken": false, 
          "refresh": null, 
          "userState": null
        }
      )
    });
  });

  describe('Using Local Storage', () => {

    beforeEach(()=>{
      localStorage.setItem('___type', 'Bearer');
      localStorage.setItem('___state', '{}');
    })

    afterEach(()=>{
      localStorage.removeItem('__');
      localStorage.removeItem('___type');
      localStorage.removeItem('___state');
    });

    it('Existing Local Storage are there', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo4MDA4NjA1MTk1fQ.E0EVT_4KVJHPEnC8XmukxiRRcAIo31U9wWW99RVQumA'
      
      localStorage.setItem('__', token);

      const tokenObject = new TokenObject<object>(
        '__',
        'localstorage',
        null,
      );
      
      expect(tokenObject.value).toMatchObject(
        {
          "auth": {
            'token': token,
            'type': 'Bearer',
            'expiresAt': new Date(8008605195*1000),
          }, 
          "isSignIn": true, 
          "isUsingRefreshToken": false, 
          "refresh": null, 
          "userState": {}
        }
      )
    });

    it('Existing Auth Local Storage is not a proper JWT', () => {
      const token = 'tampered_'
      localStorage.setItem('__', token);

      expect(localStorage.getItem('__')).toBe(token)
      expect(localStorage.getItem('___type')).toBe('Bearer')
      expect(localStorage.getItem('___state')).toBe('{}')

      const tokenObject = new TokenObject<object>(
        '__',
        'localstorage',
        null,
        window.location.hostname,
        window.location.protocol === 'https:',
      );
      
      expect(tokenObject.value).toMatchObject(
        {
          "auth": null, 
          "isSignIn": false, 
          "isUsingRefreshToken": false, 
          "refresh": null, 
          "userState": null
        }
      )

      expect(localStorage.getItem('__')).toBeNull();
      expect(localStorage.getItem('___type')).toBeNull();
      expect(localStorage.getItem('___state')).toBeNull();
    });

    it('Existing Auth Localstorage was expired', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo5NzE0OTc5OTV9.XJbNAE-aRz7tO7tSHiUlMGGuUrAELPPkNITKVlNZ8DA'
      localStorage.setItem('__', token);

      const tokenObject = new TokenObject<object>(
        '__',
        'localstorage',
        null,
        window.location.hostname,
        window.location.protocol === 'https:',
      );
      
      expect(tokenObject.value).toMatchObject(
        {
          "auth": null, 
          "isSignIn": false, 
          "isUsingRefreshToken": false, 
          "refresh": null, 
          "userState": null
        }
      );

      expect(localStorage.getItem('__')).toBeNull();
      expect(localStorage.getItem('___type')).toBeNull();
      expect(localStorage.getItem('___state')).toBeNull();
    });
  });
});

describe('Initial Value [With Refresh Token]', () => {
  it('No Existing cookie is there', () => {
    const tokenObject = new TokenObject<object>(
      '__',
      'cookie',
      '__re',
      window.location.hostname,
      window.location.protocol === 'https:',
    );

    expect(tokenObject.value).toMatchObject({"auth": null, "isSignIn": false, "isUsingRefreshToken": true, "refresh": null, "userState": null})
  });

  it('No Existing Local Storage is there', () => {
    const tokenObject = new TokenObject<object>(
      '__',
      'localstorage',
      '__re'
    );

    expect(tokenObject.value).toMatchObject({"auth": null, "isSignIn": false, "isUsingRefreshToken": true, "refresh": null, "userState": null})
  });

  describe('Existing Cookies are there', () => {

    beforeEach(()=>{
      Cookies.set('___type', 'Bearer');
      Cookies.set('___state', '{}');
    })

    afterEach(()=>{
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
      
      expect(tokenObject.value).toMatchObject(
        {
          "auth": {
            'token': token,
            'type': 'Bearer',
            'expiresAt': new Date(8008605195*1000),
          }, 
          "isSignIn": true, 
          "isUsingRefreshToken": true, 
          "refresh": {
            'token': refreshToken,
            'expiresAt': new Date(8008620863 * 1000)
          }, 
          "userState": {}
        }
      );

      expect(Cookies.get('__')).toBe(token);
      expect(Cookies.get('___type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('__re')).toBe(refreshToken);
    });

    it('Existing Auth Cookie is not a proper JWT but Refresh Token is not proper JWT', () => {
      const token = 'tampered_'
      Cookies.set('__', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo4MDA4NjIwODYzfQ.pXpDIqK20WJgkzMLbR7yjL4VD-NBMYsOVptOGR7Wf2E'
      Cookies.set('__re', refreshToken);

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
      
      expect(tokenObject.value).toMatchObject(
        {
          "auth": null, 
          "isSignIn": false, 
          "isUsingRefreshToken": true, 
          "refresh": {
            'token': refreshToken,
            'expiresAt': new Date(8008620863 * 1000)
          }, 
          "userState": null
        }
      )

      expect(Cookies.get('__')).toBeUndefined()
      expect(Cookies.get('___type')).toBeUndefined()
      expect(Cookies.get('___state')).toBeUndefined()
      expect(Cookies.get('__re')).toBe(refreshToken)
    });

    it('Existing Auth Cookie and Refresh Cookies are not a proper JWT', () => {
      const token = 'tampered_'
      Cookies.set('__', token);

      const refreshToken = 'tempered__'
      Cookies.set('__re', refreshToken);

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
      
      expect(tokenObject.value).toMatchObject(
        {
          "auth": null, 
          "isSignIn": false, 
          "isUsingRefreshToken": true, 
          "refresh": null, 
          "userState": null
        }
      )

      expect(Cookies.get('__')).toBeUndefined()
      expect(Cookies.get('___type')).toBeUndefined()
      expect(Cookies.get('___state')).toBeUndefined()
      expect(Cookies.get('__re')).toBeUndefined()
    });

    it('Existing Auth Cookie was already expired but Refresh Cookie is not expired', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo5NzE0OTc5OTV9.XJbNAE-aRz7tO7tSHiUlMGGuUrAELPPkNITKVlNZ8DA'
      Cookies.set('__', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo4MDA4NjIwODYzfQ.pXpDIqK20WJgkzMLbR7yjL4VD-NBMYsOVptOGR7Wf2E'
      Cookies.set('__re', refreshToken);

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
      
      expect(tokenObject.value).toMatchObject(
        {
          "auth": null, 
          "isSignIn": false, 
          "isUsingRefreshToken": true, 
          "refresh": {
            'token': refreshToken,
            'expiresAt': new Date(8008620863 * 1000)
          }, 
          "userState": null
        }
      );

      expect(Cookies.get('__')).toBeUndefined()
      expect(Cookies.get('___type')).toBeUndefined()
      expect(Cookies.get('___state')).toBeUndefined()
      expect(Cookies.get('__re')).toBe(refreshToken)
    });

    it('Existing Auth Cookie and Refresh Cookie were already expired', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo5NzE0OTc5OTV9.XJbNAE-aRz7tO7tSHiUlMGGuUrAELPPkNITKVlNZ8DA'
      Cookies.set('__', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo5NzE0OTc5OTV9.XJbNAE-aRz7tO7tSHiUlMGGuUrAELPPkNITKVlNZ8DA'
      Cookies.set('__re', refreshToken);

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
      
      expect(tokenObject.value).toMatchObject(
        {
          "auth": null, 
          "isSignIn": false, 
          "isUsingRefreshToken": true, 
          "refresh": null,
          "userState": null
        }
      );

      expect(Cookies.get('__')).toBeUndefined();
      expect(Cookies.get('___type')).toBeUndefined();
      expect(Cookies.get('___state')).toBeUndefined();
      expect(Cookies.get('__re')).toBeUndefined();
    });
  });

  describe('Existing Local Storage are there', () => {

    beforeEach(()=>{
      localStorage.setItem('___type', 'Bearer');
      localStorage.setItem('___state', '{}');
    })

    afterEach(()=>{
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

      expect(localStorage.getItem('__')).toBe(token);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');
      expect(localStorage.getItem('__re')).toBe(refreshToken);

      const tokenObject = new TokenObject<object>(
        '__',
        'localstorage',
        '__re'
      );
      
      expect(tokenObject.value).toMatchObject(
        {
          "auth": {
            'token': token,
            'type': 'Bearer',
            'expiresAt': new Date(8008605195*1000),
          }, 
          "isSignIn": true, 
          "isUsingRefreshToken": true, 
          "refresh": {
            'token': refreshToken,
            'expiresAt': new Date(8008620863 * 1000)
          }, 
          "userState": {}
        }
      );

      expect(localStorage.getItem('__')).toBe(token);
      expect(localStorage.getItem('___type')).toBe('Bearer');
      expect(localStorage.getItem('___state')).toBe('{}');
      expect(localStorage.getItem('__re')).toBe(refreshToken);
    });

    // it('Existing Auth Cookie is not a proper JWT but Refresh Token is not proper JWT', () => {
    //   const token = 'tampered_'
    //   Cookies.set('__', token);

    //   const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo4MDA4NjIwODYzfQ.pXpDIqK20WJgkzMLbR7yjL4VD-NBMYsOVptOGR7Wf2E'
    //   Cookies.set('__re', refreshToken);

    //   expect(Cookies.get('__')).toBe(token)
    //   expect(Cookies.get('___type')).toBe('Bearer')
    //   expect(Cookies.get('___state')).toBe('{}')
    //   expect(Cookies.get('__re')).toBe(refreshToken)


    //   const tokenObject = new TokenObject<object>(
    //     '__',
    //     'cookie',
    //     '__re',
    //     window.location.hostname,
    //     window.location.protocol === 'https:',
    //   );
      
    //   expect(tokenObject.value).toMatchObject(
    //     {
    //       "auth": null, 
    //       "isSignIn": false, 
    //       "isUsingRefreshToken": true, 
    //       "refresh": {
    //         'token': refreshToken,
    //         'expiresAt': new Date(8008620863 * 1000)
    //       }, 
    //       "userState": null
    //     }
    //   )

    //   expect(Cookies.get('__')).toBeUndefined()
    //   expect(Cookies.get('___type')).toBeUndefined()
    //   expect(Cookies.get('___state')).toBeUndefined()
    //   expect(Cookies.get('__re')).toBe(refreshToken)
    // });

    // it('Existing Auth Cookie and Refresh Cookies are not a proper JWT', () => {
    //   const token = 'tampered_'
    //   Cookies.set('__', token);

    //   const refreshToken = 'tempered__'
    //   Cookies.set('__re', refreshToken);

    //   expect(Cookies.get('__')).toBe(token);
    //   expect(Cookies.get('___type')).toBe('Bearer');
    //   expect(Cookies.get('___state')).toBe('{}');
    //   expect(Cookies.get('__re')).toBe(refreshToken);


    //   const tokenObject = new TokenObject<object>(
    //     '__',
    //     'cookie',
    //     '__re',
    //     window.location.hostname,
    //     window.location.protocol === 'https:',
    //   );
      
    //   expect(tokenObject.value).toMatchObject(
    //     {
    //       "auth": null, 
    //       "isSignIn": false, 
    //       "isUsingRefreshToken": true, 
    //       "refresh": null, 
    //       "userState": null
    //     }
    //   )

    //   expect(Cookies.get('__')).toBeUndefined()
    //   expect(Cookies.get('___type')).toBeUndefined()
    //   expect(Cookies.get('___state')).toBeUndefined()
    //   expect(Cookies.get('__re')).toBeUndefined()
    // });

    // it('Existing Auth Cookie was already expired but Refresh Cookie is not expired', () => {
    //   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo5NzE0OTc5OTV9.XJbNAE-aRz7tO7tSHiUlMGGuUrAELPPkNITKVlNZ8DA'
    //   Cookies.set('__', token);

    //   const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo4MDA4NjIwODYzfQ.pXpDIqK20WJgkzMLbR7yjL4VD-NBMYsOVptOGR7Wf2E'
    //   Cookies.set('__re', refreshToken);

    //   expect(Cookies.get('__')).toBe(token);
    //   expect(Cookies.get('___type')).toBe('Bearer');
    //   expect(Cookies.get('___state')).toBe('{}');
    //   expect(Cookies.get('__re')).toBe(refreshToken);

    //   const tokenObject = new TokenObject<object>(
    //     '__',
    //     'cookie',
    //     '__re',
    //     window.location.hostname,
    //     window.location.protocol === 'https:',
    //   );
      
    //   expect(tokenObject.value).toMatchObject(
    //     {
    //       "auth": null, 
    //       "isSignIn": false, 
    //       "isUsingRefreshToken": true, 
    //       "refresh": {
    //         'token': refreshToken,
    //         'expiresAt': new Date(8008620863 * 1000)
    //       }, 
    //       "userState": null
    //     }
    //   );

    //   expect(Cookies.get('__')).toBeUndefined()
    //   expect(Cookies.get('___type')).toBeUndefined()
    //   expect(Cookies.get('___state')).toBeUndefined()
    //   expect(Cookies.get('__re')).toBe(refreshToken)
    // });

    // it('Existing Auth Cookie and Refresh Cookie were already expired', () => {
    //   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo5NzE0OTc5OTV9.XJbNAE-aRz7tO7tSHiUlMGGuUrAELPPkNITKVlNZ8DA'
    //   Cookies.set('__', token);

    //   const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo5NzE0OTc5OTV9.XJbNAE-aRz7tO7tSHiUlMGGuUrAELPPkNITKVlNZ8DA'
    //   Cookies.set('__re', refreshToken);

    //   expect(Cookies.get('__')).toBe(token);
    //   expect(Cookies.get('___type')).toBe('Bearer');
    //   expect(Cookies.get('___state')).toBe('{}');
    //   expect(Cookies.get('__re')).toBe(refreshToken);

    //   const tokenObject = new TokenObject<object>(
    //     '__',
    //     'cookie',
    //     '__re',
    //     window.location.hostname,
    //     window.location.protocol === 'https:',
    //   );
      
    //   expect(tokenObject.value).toMatchObject(
    //     {
    //       "auth": null, 
    //       "isSignIn": false, 
    //       "isUsingRefreshToken": true, 
    //       "refresh": null,
    //       "userState": null
    //     }
    //   );

    //   expect(Cookies.get('__')).toBeUndefined();
    //   expect(Cookies.get('___type')).toBeUndefined();
    //   expect(Cookies.get('___state')).toBeUndefined();
    //   expect(Cookies.get('__re')).toBeUndefined();
    // });
  });
});