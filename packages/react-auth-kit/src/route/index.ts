/**
 * Router Plugin for React Auth Kit
 * It's used to navigate between pages when needed by react-auth-kit
 *
 */
interface Router {
    /**
     * Navigate function
     * @param param0 - object with \{to\} - navigate to pagaram
     */
    navigate: ({to}: {to: string}) => void
    /**
     * Hook to navigate
     * @returns Hook function
     */
    useNavigate: () => ({to}: {to: string}) => void

    /**
     *
     * @returns Current path
     */
    usePath: () => () => string
}

export default Router;
