import {AuthKitStateInterface} from '../../types';
import {
  authReducer,
  doSignIn,
  doSignOut,
  doRefresh,
} from '../../utils/reducers';
import {
  ActionType,
  SignInAction,
  SignInActionPayload,
  SignOutAction,
  RefreshTokenAction, RefreshTokenActionPayload,
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

    describe('when action.type is ActionType.RefreshToken', () => {
      describe('When the user is signed in', ()=> {
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

        it('only new Authentication Token is provided', ()=>{
          const action: RefreshTokenAction = {
            type: ActionType.RefreshToken,
            payload: {
              newAuthToken: 'gserter',
            },
          };

          const uut = authReducer(authKitState, action);

          expect(uut.auth?.token).toEqual(action.payload.newAuthToken);
          expect(uut.isSignIn).toBe(true);
          expect(uut.auth?.expiresAt).toEqual(authKitState.auth?.expiresAt);
          expect(uut.refresh).toEqual(authKitState.refresh);
          expect(uut.userState).toEqual(authKitState.userState);
        });

        it('only new Authentication Token and its expire time' +
          'is provided', ()=>{
          const action: RefreshTokenAction = {
            type: ActionType.RefreshToken,
            payload: {
              newAuthToken: 'gserter',
              newAuthTokenExpireIn: 20,
            },
          };

          const uut = authReducer(authKitState, action);

          expect(uut.auth?.token).toEqual(action.payload.newAuthToken);
          expect(uut.auth?.expiresAt).not.toEqual(authKitState.auth?.expiresAt);
          expect(uut.isSignIn).toBe(true);
          expect(uut.refresh).toEqual(authKitState.refresh);
          expect(uut.userState).toEqual(authKitState.userState);
        });

        it('new auth and refresh token is provided ' +
          'but the timing is same', ()=>{
          const action: RefreshTokenAction = {
            type: ActionType.RefreshToken,
            payload: {
              newAuthToken: 'gserter',
              newRefreshToken: 'eiklsvrbhi',
            },
          };

          const uut = authReducer(authKitState, action);

          expect(uut.auth?.token).toEqual(action.payload.newAuthToken);
          expect(uut.auth?.expiresAt).toEqual(authKitState.auth?.expiresAt);
          expect(uut.isSignIn).toBe(true);
          expect(uut.refresh?.token).toEqual(action.payload.newRefreshToken);
          expect(uut.refresh?.expiresAt)
              .toEqual(authKitState.refresh?.expiresAt);
          expect(uut.userState).toEqual(authKitState.userState);
        });

        it('only new auth and refresh expire times are provided', ()=>{
          const action: RefreshTokenAction = {
            type: ActionType.RefreshToken,
            payload: {
              newAuthTokenExpireIn: 20,
              newRefreshTokenExpiresIn: 60,
              newAuthToken: null,
            },
          };

          const uut = authReducer(authKitState, action);

          expect(uut.auth?.token).toEqual(authKitState.auth?.token);
          expect(uut.auth?.expiresAt).not.toEqual(authKitState.auth?.expiresAt);
          expect(uut.isSignIn).toBe(true);
          expect(uut.refresh?.token).toEqual(authKitState.refresh?.token);
          expect(uut.refresh?.expiresAt)
              .not.toEqual(authKitState.refresh?.token);
          expect(uut.userState).toEqual(authKitState.userState);
        });

        it('new auth token and new user state is provided', ()=>{
          const action: RefreshTokenAction = {
            type: ActionType.RefreshToken,
            payload: {
              newAuthToken: 'gserter',
              newAuthUserState: {
                userId: 'xyz',
              },
            },
          };

          const uut = authReducer(authKitState, action);

          expect(uut.auth?.token).toEqual(action.payload.newAuthToken);
          expect(uut.auth?.expiresAt).toEqual(authKitState.auth?.expiresAt);
          expect(uut.isSignIn).toBe(true);
          expect(uut.refresh).toEqual(authKitState.refresh);
          expect(uut.userState).not.toEqual(authKitState.userState);
          expect(uut.userState).toEqual(action.payload.newAuthUserState);
        });
      });

      it('When the user is not signed in', ()=> {
        const authKitState: AuthKitStateInterface = {
          auth: null,
          refresh: null,
          userState: null,
          isSignIn: false,
          isUsingRefreshToken: true,
        };

        const action: RefreshTokenAction = {
          type: ActionType.RefreshToken,
          payload: {
            newAuthToken: 'gserter',
            newRefreshToken: 'eiklsvrbhi',
          },
        };

        const uut = authReducer(authKitState, action);

        expect(uut).toEqual(authKitState);
      });
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
    it('always returns ActionType.RefreshToken + payload', () => {
      const payload: RefreshTokenActionPayload = {
        newAuthToken: 'ggasdgas',
        newAuthTokenExpireIn: 10,
        newRefreshTokenExpiresIn: 30,
        newAuthUserState: {
          userid: 123,
        },
        newRefreshToken: 'sdgsdgsd',
      };

      const uut = doRefresh(payload);

      expect(uut.type).toEqual(ActionType.RefreshToken);
      expect(uut.payload).toEqual(payload);
    });
  });

  describe('doRefresh returns correct ActionType', () => {
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
