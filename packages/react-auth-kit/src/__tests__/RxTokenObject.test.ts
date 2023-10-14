import Cookies from 'js-cookie';
import TokenObject from '../RxTokenObject';

describe('Initial Value [Without Refresh Token]', () => {

  describe('Using Cookie', () => {
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

    it('Existing Cookies are there', () => {
      Cookies.set('__', 'random');
      Cookies.set('___type', 'Bearer');
      Cookies.set('___state', '{}');

      const tokenObject = new TokenObject<object>(
        '__',
        'cookie',
        null,
        window.location.hostname,
        window.location.protocol === 'https:',
      );
      
      console.log(tokenObject.value);
      
      expect(tokenObject.value).toMatchObject(
        {
          "auth": {
            'token': 'random',
            'type': 'Bearer',
            'expiresAt': '',
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