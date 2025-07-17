import Action from '../../utils/action';
import {ITokenStore} from "../../store";
import {AuthKitState} from '../../types';

describe('Action', () => {
  const setFn = jest.fn();

  const tokenStore: ITokenStore<any> = {
    set: setFn,
    subscribe: jest.fn(),
    value: undefined,
    syncTokens: function (authState: AuthKitState<any>): void {
      throw new Error('Function not implemented.');
    }
  }

  beforeEach(() => {
    setFn.mockClear();
  });

  describe('Do Sign In', () => {
    it('Default Values', () => {
      Action.doSignIn({
        auth: {
          token: 'token',
        },
      }, tokenStore);

      expect(setFn).toHaveBeenCalled();
      expect(setFn).toHaveBeenCalledWith({
        auth: {
          token: 'token',
          type: "Bearer",
        },
        refresh: undefined,
        userState: {},
      });
    });

    it('Extra Values', () => {
      Action.doSignIn({
        auth: {
          token: 'token',
          type: 'hello',
        },
        refresh: 'refresh',
        userState: {
          name: 'aaa',
        },
      }, tokenStore);
      expect(setFn).toHaveBeenCalled();
      expect(setFn).toHaveBeenCalledWith({
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

  test('Do Sign Out', () => {
    Action.doSignOut(tokenStore);

    expect(setFn).toHaveBeenCalled();
    expect(setFn).toHaveBeenCalledWith({
      auth: null
    });
  });

  describe('Do refresh', () => {
    it('New Auth Token', () => {
      Action.doRefresh({
        newAuthToken: 'token',
        isSuccess: true
      }, tokenStore);
      expect(setFn).toHaveBeenCalled();
      expect(setFn).toHaveBeenCalledWith({
        auth: {
          token: 'token',
          type: 'Bearer',
        },
      });
    });
    it('New Auth Token and Type', () => {
      Action.doRefresh({
        newAuthToken: 'token',
        newAuthTokenType: 'type',
        isSuccess: true
      }, tokenStore);
      expect(setFn).toHaveBeenCalledWith({
        auth: {
          token: 'token',
          type: 'type',
        },
      });
    });
    it('New Auth Token and Refresh Token', () => {
      Action.doRefresh({
        newAuthToken: 'token',
        newRefreshToken: 'refresh',
        isSuccess: true
      }, tokenStore);
      expect(setFn).toHaveBeenCalledWith({
        auth: {
          token: 'token',
          type: 'Bearer',
        },
        refresh: 'refresh',
      });
    });
    it('New Auth Token and Auth state', () => {
      Action.doRefresh({
        newAuthToken: 'token',
        newAuthUserState: {
          name: 'react',
        },
        isSuccess: true
      }, tokenStore);
      expect(setFn).toHaveBeenCalledWith({
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
});
