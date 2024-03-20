abstract class Router {
    abstract navigate({to}: {to: string}): void
    abstract useNavigate({to}: {to: string}): void
}

export default Router;