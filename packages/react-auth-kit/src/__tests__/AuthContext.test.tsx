//@ts-ignore
import React from 'react';

import AuthKitContext from '../AuthContext';
import {useReactAuthKit} from '../AuthContext';
import {render} from '@testing-library/react';
import Cookies from 'js-cookie';
import TokenObject from '../RxTokenObject';

test('All Expected Exports are there', ()=>{
  expect(AuthKitContext).toBeTruthy();
  expect(useReactAuthKit).toBeTruthy();
});

test('Testing Conext Workflow', ()=>{
  const TestComponent = () => {
    const c = useReactAuthKit();
    return <div id="test"> {JSON.stringify(c.value)} </div>;
  };

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
      '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
      '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
  Cookies.set('__', token);

  const tokenObject = new TokenObject<object>(
      '__',
      'cookie',
      null,
      false,
      window.location.hostname,
      window.location.protocol === 'https:',
  );


  render(
      <AuthKitContext.Provider value={tokenObject as any}>
        <TestComponent/>
      </AuthKitContext.Provider>,
  );

  const data = document.querySelector('#test');
  expect(data?.innerHTML).toEqual(` ${JSON.stringify(tokenObject.value)} `);
});
