interface Router {
    navigate: ({to}: {to: string}) => void
    useNavigate: () => ({to}: {to: string}) => void
}

export default Router;