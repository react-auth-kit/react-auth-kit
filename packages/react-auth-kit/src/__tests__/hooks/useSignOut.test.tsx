import React from 'react';
import {renderHook} from '@testing-library/react';
import useSignOut from '../../hooks/useSignOut';
import AuthContext from '../../AuthContext';
import TokenObject from '../../RxTokenObject';
import * as reducers from '../../utils/reducers';

const spy = jest.spyOn(reducers,  'doSignOut');

describe('useSignOut', () => {
  it('Without refresh token', ()=> {
    const tokenObject = new TokenObject<unknown>(
      '__',
      'cookie',
      null,
      true,
      window.location.hostname,
      window.location.protocol === 'https:',
    );
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AuthContext.Provider value={tokenObject}>
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useSignOut(), {wrapper});
    
    result.current();
    expect(spy).toHaveBeenCalled();
  });
});
