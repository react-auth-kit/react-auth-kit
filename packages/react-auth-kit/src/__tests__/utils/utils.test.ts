import {
  isAuthenticated,
} from '../../utils/utils';

describe('Is Authenticated', ()=>{
  it('Old date', ()=>{
    const res = isAuthenticated({
      auth: {
        type: 'type',
        token: 'token',
        expiresAt: new Date(2000),
      },
      isSignIn: true,
      isUsingRefreshToken: true,
      refresh: {
        expiresAt: new Date(2000),
        token: 'refresh',
      },
      userState: {
        name: 'react',
      },

    });

    expect(res).toBeFalsy();
  });

  it('Next date', ()=>{
    const res = isAuthenticated({
      auth: {
        type: 'type',
        token: 'token',
        expiresAt: new Date(3000),
      },
      isSignIn: true,
      isUsingRefreshToken: true,
      refresh: {
        expiresAt: new Date(3000),
        token: 'refresh',
      },
      userState: {
        name: 'react',
      },

    });

    expect(res).toBeFalsy();
  });

  it('Auth Null', ()=>{
    const res = isAuthenticated({
      auth: null,
      isSignIn: false,
      isUsingRefreshToken: true,
      refresh: {
        expiresAt: new Date(3000),
        token: 'refresh',
      },
      userState: null,
    });

    expect(res).toBeFalsy();
  });
});
