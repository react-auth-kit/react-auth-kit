import * as React from 'react';
import {AuthContextConsumer} from '../AuthProvider';

interface withAuthProps {
    authState: object | null
}

function withAuthUser<P extends withAuthProps>(Component: React.ComponentType<P>): React.FC<P> {
  return (props: P)=>{
    return (
      <AuthContextConsumer>
        {(value) => (
          <Component {...props} authState={value?.authState.authState}/>
        )}
      </AuthContextConsumer>
    );
  };
}

export default withAuthUser;
