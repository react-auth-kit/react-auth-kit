'use client';

import * as React from 'react';
import {useRouter} from 'next/navigation';

import {useReactAuthKitContext} from 'react-auth-kit/AuthContext';
import {isAuthenticated} from 'react-auth-kit/utils/utils';
import {doSignOut} from 'react-auth-kit/utils/reducers';


/**
 * Component Props for Auth Outlet
 */
interface NextAuthProps {
  /**
  * Path to redirect if the user is not authenticated
  *
  * @example
  * `/login`
  */
  fallbackPath: string
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
  const context = useReactAuthKitContext();
  const [login, setLogIn] = React.useState(false);

  const {push} = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated(context.value)) {
      // Redirect them to the /login page, but save the current location they
      // were trying to go to when they were redirected. This allows us to
      // send them along to that page after they login, which is a nicer
      // user experience than dropping them off on the home page.
      context.set(doSignOut());
      push(fallbackPath);
    } else {
      setLogIn(true);
    }
  }, []);
  return login;
}
