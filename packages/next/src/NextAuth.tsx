// noinspection JSDeprecatedSymbols

'use client';

import type {ReactNode} from 'react';
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
    * @deprecated Use AuthProvider fallbackPath prop instead.
    * Will be removed in the upcoming version
    * @example
    * `/login`
    */
   fallbackPath?: string
   children: ReactNode
 }

/**
  *
  * Next.js Page Wrapper component.
  *
  * @param props - The Properties of the component
  * @returns - Component with React Auth Kit integrated
  *
  * @example
  * ```jsx
  * // layout.jsx
  *
  * export default function Layout({
  *   children,
  * }: {
  *   children: React.ReactNode
  * }) {
  *   return <NextAuth fallbackPath={"/login"}>{children}</NextAuth>
  * }
  * ```
  *
  */
export default function NextAuth({fallbackPath, children}: NextAuthProps) {
  const store = useReactAuthKitStore();
  const config = useReactAuthKitConfig();
  const [login, setLogIn] = useState(false);

  const {push} = useRouter();

  let fp: string;
  if (!fallbackPath && !config.fallbackPath) {
    throw new AuthKitConfigError(
        'fallbackPath prop must be present in'+
        ' AuthProvider or NextAuth component',
    );
  } else if (fallbackPath) {
    fp = fallbackPath;
  } else {
    fp = config.fallbackPath || '';
  }

  useEffect(() => {
    if (!isAuthenticated(store.value)) {
      // Redirect them to the /login page, but save the current location they
      // were trying to go to when they were redirected. This allows us to
      // send them along to that page after they log in, which is a nicer
      // user experience than dropping them off on the home page.
      Action.doSignOut(store);
      push(fp);
    } else {
      setLogIn(true);
    }
  }, []);

  return login && children;
}
