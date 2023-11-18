import TokenObject from './RxTokenObject';
import {AuthError} from './errors';
import {createRefreshParamInterface} from './types';

interface createStoreParam<T> {
    authName: string;
    authType: 'cookie' | 'localstorage';
    refresh?: createRefreshParamInterface<T>;
    cookieDomain?: string;
    cookieSecure?: boolean;
}

export interface createStoreReturn<T> {
    tokenObject: TokenObject<T>
    refresh?: createRefreshParamInterface<T>;
}

export default function createStore<T>(params: createStoreParam<T>): createStoreReturn<T> {
  if (params.authType === 'cookie') {
    if (!params.cookieDomain && !params.cookieSecure) {
      throw new
      AuthError('authType \'cookie\' ' +
                    'requires \'cookieDomain\' and \'cookieSecure\' ' +
                    'props in AuthProvider');
    }
  }

  const refreshTokenName = params.refresh ? `${params.authName}_refresh` : null;
  const tokenObject = new TokenObject<T>(
      params.authName,
      params.authType,
      refreshTokenName,
      params.cookieDomain,
      params.cookieSecure,
  );

  return {
    tokenObject,
    refresh: params.refresh,
  };
}
