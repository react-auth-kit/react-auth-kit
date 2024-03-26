import Router from "react-auth-kit/route";

import { useNavigate as useReactRouteNavigate, redirect } from "react-router";

class ReactRouterPlugin implements Router{
    navigate({ to }: { to: string; }): void {
        redirect(to)
    }
    useNavigate(): ({ to }: { to: string; }) => void {
        const navigate = useReactRouteNavigate();
        return ({to}: { to: string; })=> navigate(to)
    }   
}

export default ReactRouterPlugin;
