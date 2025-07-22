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
 * Component Props for Auth Outlet
 */
interface NextAuthProps {
  /**
  * Path to redirect if the user is not authenticated
  *
  * @deprecated Use AuthProvider fallpackPath prop instead.
  * Will be removed in the upcoming version
  * @example
  * `/login`
  */
  fallbackPath?: string
}


/**
 * React hook to implement the NextAuth feature
 * @param arg - Params of the hook
 * @returns - Authentication Ready state
 *
 * @remarks
 * Usage of this hook will make the page CSR, any SSR will not work in
 * private routes, as the private data in stored on the client side,
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
export default function useNextAuth({fallbackPath}:NextAuthProps):boolean {
  const store = useReactAuthKitStore();
  const {push} = useRouter();
  const config = useReactAuthKitConfig();

  const [login, setLogIn] = useState(false);

  let fp: string;
  if (!fallbackPath && !config.fallbackPath) {
    throw new AuthKitConfigError(
        'fallbackPath prop must be present in'+
      ' AuthProvider or RequireAuth component',
    );
  } else if (fallbackPath) {
    fp = fallbackPath;
  } else {
    fp = config.fallbackPath || '';
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
