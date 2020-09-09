import * as React from 'react'
import {AuthContextConsumer} from '../AuthProvider'
import {Subtract} from "utility-types";

interface withAuthProps {
    authState: object | null
}

function withAuth<T extends withAuthProps>(Component: React.ComponentType<T>) {
    return class extends React.Component<Subtract<T, withAuthProps>> {
        render() {
            return (
                <AuthContextConsumer>
                    {(value) => (
                        <Component {...(this.props as T)} authState={value?.authState.authState}/>
                    )}
                </AuthContextConsumer>
            )
        }
    }
}

export default withAuth
