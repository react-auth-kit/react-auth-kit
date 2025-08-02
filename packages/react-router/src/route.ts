import {IRouter} from 'react-auth-kit/route/IRouter';

import {
  useNavigate as useReactRouteNavigate,
  redirect,
  useLocation,
} from 'react-router';

/**
 * React Router
 * React Auth Kit Plugin
 */
const ReactRouterPlugin: IRouter = {
  navigate: function({to}: { to: string; }): void {
    redirect(to);
  },
  useNavigate: function(): ({to}: { to: string; }) => void {
    const navigate = useReactRouteNavigate();
    return ({to}: { to: string; }) => {
      navigate(to);
    }
  },
  usePath: function(): () => string {
    const location = useLocation();
    return () => location.pathname;
  },
};

export default ReactRouterPlugin;
