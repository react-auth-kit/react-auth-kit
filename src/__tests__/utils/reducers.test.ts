import {AuthKitStateInterface} from '../../types';
import {
  authReducer,
  doSignIn,
  doSignOut,
} from '../../utils/reducers';
import {
  ActionType,
  SignInAction,
  SignInActionPayload,
  SignOutAction,
} from '../../utils/actions';

describe('reducers test suite', () => {
  describe('authReducer returns correct AuthKitState', () => {
    it('when action.type is ActionType.SignIn', () => {
      const authKitState: AuthKitStateInterface = {
        auth: {
          token: 'test',
          type: 'string',
          expiresAt: new Date(),
        },
        refresh: {
          token: 'sddsf',
          expiresAt: new Date(),
        },
        userState: null,
        isSignIn: true,
        isUsingRefreshToken: true,
      };

      const action: SignInAction = {
        type: ActionType.SignIn,
        payload: {
          auth: {
            token: 'string',
            type: 'string',
            expiresAt: new Date(),
          },
          refresh: {
            token: 'string',
            expiresAt: new Date(),
          },
          userState: null,
        },
      };

      const uut = authReducer(authKitState, action);

      expect(uut.auth).toEqual(action.payload.auth);
      expect(uut.isSignIn).toBe(true);
      expect(uut.refresh).toEqual(action.payload.refresh);
      expect(uut.userState).toEqual(action.payload.userState);
    });

    it('when action.type is ActionType.SignOut', () => {
      const authKitState: AuthKitStateInterface = {
        auth: {
          token: 'test',
          type: 'string',
          expiresAt: new Date(),
        },
        refresh: {
          token: 'sddsf',
          expiresAt: new Date(),
        },
        userState: null,
        isSignIn: true,
        isUsingRefreshToken: true,
      };

      const action: SignOutAction = {
        type: ActionType.SignOut,
      };

      const uut = authReducer(authKitState, action);

      expect(uut.auth).toBeNull();
      expect(uut.isSignIn).toBe(false);
      expect(uut.refresh).toBeNull();
      expect(uut.userState).toBeNull();
    });
  });

  describe('doSignIn returns correct ActionType', () => {
    it('always returns ActionType.SignIn + payload', () => {
      const payload: SignInActionPayload = {
        auth: {
          token: 'string',
          type: 'string',
          expiresAt: new Date(),
        },
        refresh: {
          token: 'string',
          expiresAt: new Date(),
        },
        userState: null,
      };

      const uut = doSignIn(payload);

      expect(uut.type).toEqual(ActionType.SignIn);
      expect(uut.payload).toEqual(payload);
    });
  });

  describe('doSignOut returns correct ActionType', () => {
    it('always returns ActionType.SignOut', () => {
      const uut = doSignOut();

      expect(uut.type).toEqual(ActionType.SignOut);
    });
  });
});
