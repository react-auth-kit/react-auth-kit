import {IRouter} from 'react-auth-kit/route/IRouter';

import {usePathname, useRouter, redirect} from 'next/navigation';


/**
 * `NextPlugin` is an object that provides utility methods for navigating
 * within a Next.js application and retrieving the current path.
 *
 * Properties:
 * - `navigate`: A function to navigate to a specific path. Takes an object with a `to` property specifying the target path.
 * - `useNavigate`: A hook to create a navigation function. Returns a function that takes an object with a `to` property and performs navigation.
 * - `usePath`: A hook to retrieve the current pathname. Returns a function that, when called, gives the current pathname as a string.
 *
 * This plugin is useful for integrating programmatic navigation and path handling in a Next.js environment.
 */
const NextPlugin: IRouter = {
  navigate: function({to}: { to: string; }): void {
    redirect(to);
  },
  useNavigate: function(): ({to}: { to: string; }) => void {
    const router = useRouter();
    return ({to}: { to: string; }) => router.push(to);
  },
  usePath: function(): () => string {
    const pathname = usePathname();
    return () => pathname;
  },
};

export default NextPlugin;
