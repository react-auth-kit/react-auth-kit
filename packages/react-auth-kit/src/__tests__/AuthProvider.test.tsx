import {render} from '@testing-library/react';

import TokenObject from '../RxTokenObject';
import AuthProvider from './../AuthProvider';
// import createRefresh from '../createRefresh';
// import Cookies from 'js-cookie';

jest.useFakeTimers();

describe('AuthProvider', () => {
  it('Renders Successfully', () => {
    const tokenObject = new TokenObject<Record<string, unknown>>(
        '__',
        'cookie',
        null,
        false,
        window.location.hostname,
        window.location.protocol === 'https:',
    );

    render(
        <AuthProvider store={tokenObject as any}>
          <div id="test">
          Hello
          </div>
        </AuthProvider>,
    );
    const data = document.querySelector('#test');
    expect(data?.innerHTML).toEqual(`Hello`);
  });
});
