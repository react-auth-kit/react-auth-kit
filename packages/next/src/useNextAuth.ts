// noinspection JSDeprecatedSymbols

'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';

import {
  useReactAuthKitStore,
  useReactAuthKitConfig,
} from 'react-auth-kit/AuthContext';
import {isAuthenticated} from 'react-auth-kit/utils/utils';
import Action from 'react-auth-kit/utils/action';
import {AuthKitConfigError} from "react-auth-kit/error/AuthKitConfigError";


/**
 * React hook to implement the NextAuth feature
 * @returns - Authentication Ready state
 *
 * @remarks
 * Usage of this hook will make the page CSR, any SSR will not work in
 * private routes, as the private data is stored on the client side,
 * only CSR is available at this moment.
 *
 * @example
 * ```jsx
 * 'use client'
 * import { useAuth } from "@auth-kit/next/useAuth"
 * export default function Layout({
 *  children,
 * }: {
 *  children: React.ReactNode
 * }) {
 *  return useAuth({ fallbackPath: '/login'}) && children;
 * }
 * ```
 */
export default function useNextAuth():boolean {
  const store = useReactAuthKitStore();
  const {push} = useRouter();
  const config = useReactAuthKitConfig();

  const [login, setLogIn] = useState(false);

  let fp: string;
  if (!config.fallbackPath) {
    throw new AuthKitConfigError(
        'fallbackPath prop must be present in'+
      ' AuthProvider or RequireAuth component',
    );
  } else {
    fp = config.fallbackPath;
  }

  useEffect(() => {
    if (!isAuthenticated(store.value)) {
      // Redirect them to the /login page but save the current location they
      // were trying to go to when they were redirected. This allows us to
      // send them along to that page after they log in, which is a nicer
      // user experience than dropping them off on the home page.
      Action.doSignOut(store);
      push(fp);
    } else {
      setLogIn(true);
    }
  }, []);
  return login;
}
