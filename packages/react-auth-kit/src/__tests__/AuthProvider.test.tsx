import {render} from '@testing-library/react';

import AuthProvider from '../AuthProvider';
import createAuthStore from '../store';
import * as Ref from '../refresh/Refresh';
import createRefresh from '../refresh/createRefresh';

import {createCookieTokenStore} from "./helpers/storeCreation";

const Refresh = jest.spyOn(Ref, 'Refresh');
Refresh.mockImplementation((props)=>{
  return (
    <div>
      <span id='refresh'>Refresh Token</span>
      {props.children}
    </div>
  )
});

jest.useFakeTimers();

describe('AuthProvider', () => {
  it('Renders Successfully without token', () => {
    const tokenObject = createCookieTokenStore("__")

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

  it('Renders Refresh component', ()=>{
    const createRefreshData = createRefresh({
      interval: 10,
      refreshApiCallback: jest.fn()
    })

    const store = createAuthStore(
      "cookie",
      {
        authName: '__',
        cookieDomain: window.location.hostname,
        cookieSecure: window.location.protocol === 'https:',
        refresh: createRefreshData
      })

    const {container} = render(
        <AuthProvider store={store}>
          <div id="test">
          Hello
          </div>
        </AuthProvider>,
    );

    expect(Refresh).toHaveBeenCalled()
    const data = document.querySelector('#refresh');
    expect(data?.innerHTML).toEqual(`Refresh Token`);
    expect(container).toMatchSnapshot()
  });
});
