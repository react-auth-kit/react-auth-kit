import createRefresh from '../createRefresh';

import {BaseAuthKitError} from "../error/BaseAuthKitError";

test('createRefresh is working as expected', ()=>{
  const data = {
    interval: 10,
    refreshApiCallback: async (param: any) => {
      param.authToken;
      param.authUserState;
      param.refreshToken;

      return {
        isSuccess: true,
        newAuthToken: param.authToken || 'Hello',
      };
    },
  };
  expect(createRefresh(data)).toBe(data);
});

describe('createRefresh throws error for negative interval', ()=>{
  it('Negative Interval Number', ()=> {
    const refresh = () => createRefresh({
      interval: -10,
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
    expect(refresh).toThrow(BaseAuthKitError);
  });
  it('Positive Interval Number', ()=>{
    const refresh = () => createRefresh({
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
    expect(refresh).not.toThrow(BaseAuthKitError);
  });
});
