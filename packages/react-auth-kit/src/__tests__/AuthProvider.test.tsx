import {render} from '@testing-library/react';

import TokenObject from '../RxTokenObject';
import AuthProvider from './../AuthProvider';

import * as Ref from './../Refresh';
import createStore from '../createStore';
import createRefresh from '../createRefresh';

const Refresh = jest.spyOn(Ref, 'default');
Refresh.mockImplementation((props)=>{
  return (
    <div>
      <span id='refresh'>Refreshssssssssssssssss</span>
      {props.children}
    </div>
  )
})

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

  it('Renders Refresh component', ()=>{
    const createRefreshData = createRefresh({
      interval: 10,
      refreshApiCallback: jest.fn()
    }) 

    const store = createStore({
      authName: '__',
      authType: 'cookie',
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
    expect(data?.innerHTML).toEqual(`Refreshssssssssssssssss`);
    expect(container).toMatchSnapshot()
  });
});
