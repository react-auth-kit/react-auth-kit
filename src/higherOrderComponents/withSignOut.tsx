import * as React from 'react'
import {AuthContextConsumer} from '../AuthProvider'

interface withSignOutProps {
    signOut(): boolean
}

function withSignOut<P extends withSignOutProps>(Component: React.ComponentType<P>): React.FC<P> {
    return (props) => {
        return (
            <AuthContextConsumer>
                {(c) => {
                    const signOut = () => {
                        try {
                            if (c?.authState.authToken) {
                                c.setAuthState((prevState) => ({
                                    ...prevState,
                                    authToken: null,
                                    authTokenType: null,
                                    expireAt: null,
                                    authState: null
                                }))
                                return true
                            } else {
                                return false
                            }
                        } catch (e) {
                            return false
                        }
                    }
                    return <Component {...props} signOut={signOut}/>
                }}
            </AuthContextConsumer>
        )
    }
}

export default withSignOut
