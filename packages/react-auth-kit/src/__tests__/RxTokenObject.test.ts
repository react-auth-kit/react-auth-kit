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
          "auth": {
            'token': token,
            'type': 'Bearer',
            'expiresAt': new Date(971497995*1000),
          }, 
          "isSignIn": true, 
          "isUsingRefreshToken": false, 
          "refresh": null, 
          "userState": {}
        }
      )
    });
  });

  it('No Existing Local Storage is there', () => {
    const tokenObject = new TokenObject<object>(
      '__',
      'localstorage',
      null
    );

    expect(tokenObject.value).toMatchObject({"auth": null, "isSignIn": false, "isUsingRefreshToken": false, "refresh": null, "userState": null})
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

    it('Existing Auth Local Storage is not a proper JWT', () => {
      const token = 'tampered_'
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
      )
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
          "auth": {
            'token': token,
            'type': 'Bearer',
            'expiresAt': new Date(971497995*1000),
          }, 
          "isSignIn": true, 
          "isUsingRefreshToken": false, 
          "refresh": null, 
          "userState": {}
        }
      )
    });
  });
});