import {
  doSignIn,
  doSignOut,
  doRefresh,
} from '../../utils/reducers';

describe('Do Sign In', ()=>{
  it('Default Values', ()=>{
    const res = doSignIn({
      auth: {
        token: 'token',
      },
    });
    expect(res).toEqual({
      auth: {
        token: 'token',
        type: 'Bearer',
      },
      refresh: undefined,
      userState: {},
    });
  });

  it('Extra Values', ()=>{
    const res = doSignIn({
      auth: {
        token: 'token',
        type: 'hello',
      },
      refresh: 'refresh',
      userState: {
        name: 'aaa',
      },
    });
    expect(res).toEqual({
      auth: {
        token: 'token',
        type: 'hello',
      },
      refresh: 'refresh',
      userState: {
        name: 'aaa',
      },
    });
  });
});

test('Do Sign Out', ()=>{
  const res = doSignOut();
  expect(res).toEqual({
    auth: null,
  });
});

describe('Do refresh', ()=>{
  it('New Auth Token', ()=> {
    const res = doRefresh({
      newAuthToken: 'token',
      isSuccess: true
    });
    expect(res).toEqual({
      auth: {
        token: 'token',
        type: 'Bearer',
      },
    });
  });
  it('New Auth Token and Type', ()=> {
    const res = doRefresh({
      newAuthToken: 'token',
      newAuthTokenType: 'type',
      isSuccess: true
    });
    expect(res).toEqual({
      auth: {
        token: 'token',
        type: 'type',
      },
    });
  });
  it('New Auth Token and Refresh Token', ()=> {
    const res = doRefresh({
      newAuthToken: 'token',
      newRefreshToken: 'refresh',
      isSuccess: true
    });
    expect(res).toEqual({
      auth: {
        token: 'token',
        type: 'Bearer',
      },
      refresh: 'refresh',
    });
  });
  it('New Auth Token and Auth state', ()=> {
    const res = doRefresh({
      newAuthToken: 'token',
      newAuthUserState: {
        name: 'react',
      },
      isSuccess: true
    });
    expect(res).toEqual({
      auth: {
        token: 'token',
        type: 'Bearer',
      },
      userState: {
        name: 'react',
      },
    });
  });
});
