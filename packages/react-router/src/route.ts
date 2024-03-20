import Router from "react-auth-kit/route";

import { useNavigate as useReactRouteNavigate, redirect } from "react-router";

class ReactRouterPlugin implements Router{
    navigate({ to }: { to: string; }): void {
        redirect(to)
    }
    useNavigate({ to }: { to: string; }): void {
        useReactRouteNavigate()(to)
    }   
}

export default ReactRouterPlugin;
