import * as React from 'react'
import {AuthContextConsumer} from '../AuthProvider'

interface withAuthHeaderProps {
    authHeader: string
}

function withAuthHeader<P extends object>(Component: React.ComponentType<P>) {
    return class withAuthHeader extends React.Component<P & withAuthHeaderProps> {
        render() {
            const {...props} = this.props
            return (
                <AuthContextConsumer>
                    {(c) => {
                        if (c?.authState) {
                            return (
                                <Component
                                    {...(props as P)}
                                    authHeader={`${c.authState.authTokenType} ${c.authState.authToken}`}
                                />
                            )
                        } else {
                            return <Component {...(props as P)} authHeader={`Bearer `}/>
                        }
                    }}
                </AuthContextConsumer>
            )
        }
    }
}

export default withAuthHeader
