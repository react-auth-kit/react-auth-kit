

import AuthKitContext from '../AuthContext';
import {
  useReactAuthKit,
  useReactAuthKitConfig,
  useReactAuthKitRouter,
} from '../AuthContext';
import {render} from '@testing-library/react';
import Cookies from 'js-cookie';
import TokenObject from '../RxTokenObject';
import Router from '../route';
import {BaseAuthKitError} from "../error/BaseAuthKitError";

test('All Expected Exports are there', ()=>{
  expect(AuthKitContext).toBeTruthy();
  expect(useReactAuthKit).toBeTruthy();
  expect(useReactAuthKitConfig).toBeTruthy();
  expect(useReactAuthKitRouter).toBeTruthy();
});

test('Testing Context Workflow', ()=>{
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
      <AuthKitContext.Provider value={
        {
          // @ts-expect-error Type error
          token: tokenObject,
          router: undefined,
          config: {fallbackPath: '/login'},
        }
      }
      >
        <TestComponent/>
      </AuthKitContext.Provider>,
  );

  const data = document.querySelector('#test');
  expect(data?.innerHTML).toEqual(` ${JSON.stringify(tokenObject.value)} `);
});

test('Testing Context config Workflow', ()=>{
  const TestComponent = () => {
    const c = useReactAuthKitConfig();
    return <div id="test"> {JSON.stringify(c)} </div>;
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
      <AuthKitContext.Provider value={
        {
          // @ts-expect-error Any type
          token: tokenObject,
          router: undefined,
          config: {fallbackPath: '/login'},
        }
      }>
        <TestComponent/>
      </AuthKitContext.Provider>,
  );

  const data = document.querySelector('#test');
  expect(data?.innerHTML).toEqual(
      ` ${JSON.stringify({fallbackPath: '/login'})} `,
  );
});

describe('Context Workflow', ()=>{
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
    '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
    '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
  let tokenObject: TokenObject<Record<string, unknown>>;
  let AuthProvider: React.FC<React.PropsWithChildren>;

  const navigateFn = jest.fn();

  beforeEach(()=>{
    Cookies.set('__', token);
    tokenObject = new TokenObject<Record<string, unknown>>(
        '__',
        'cookie',
        null,
        false,
        window.location.hostname,
        window.location.protocol === 'https:',
    );

    const ReactRouterPlugin: Router = {
      navigate: navigateFn,
      useNavigate: function(): ({to}: { to: string; }) => void {
        return jest.fn();
      },
      usePath: function(): () => string {
        return jest.fn();
      },
    };

    AuthProvider = ({children}) => (
      <AuthKitContext.Provider value={
        {
          // @ts-expect-error Type error
          token: tokenObject,
          router: ReactRouterPlugin,
          config: {fallbackPath: '/login'},
        }
      }>
        {children}
      </AuthKitContext.Provider>);
  });

  it('useReactAuthKit', ()=>{
    const TestComponent = () => {
      const c = useReactAuthKit();
      return <div id="test"> {JSON.stringify(c.value)} </div>;
    };

    render(
        <AuthProvider>
          <TestComponent/>
        </AuthProvider>,
    );

    const data = document.querySelector('#test');
    expect(data?.innerHTML).toEqual(` ${JSON.stringify(tokenObject.value)} `);
  });

  it('useReactAuthKitConfig', ()=>{
    const TestComponent = () => {
      const c = useReactAuthKitConfig();
      return <div id="test"> {JSON.stringify(c)} </div>;
    };

    render(
        <AuthProvider>
          <TestComponent/>
        </AuthProvider>,
    );

    const data = document.querySelector('#test');
    expect(data?.innerHTML).toEqual(
        ` ${JSON.stringify({fallbackPath: '/login'})} `,
    );
  });

  it('useReactAuthKitConfig', ()=>{
    const TestComponent = () => {
      const c = useReactAuthKitRouter();
      c?.navigate({to: '/hello'});
      return <div id="test"> Hi </div>;
    };

    render(
        <AuthProvider>
          <TestComponent/>
        </AuthProvider>,
    );

    expect(navigateFn).toHaveBeenCalled();
    expect(navigateFn).toHaveBeenCalledWith({to: '/hello'});
  });
});

describe('Throws error without AuthKitContext.Provider', ()=>{
  it('useReactAuthKit', ()=>{
    const TestComponent = () => {
      const c = useReactAuthKit();
      return <div id="test"> {JSON.stringify(c.value)} </div>;
    };
    expect(() => render(
        <TestComponent/>,
    )).toThrow(BaseAuthKitError);
  });

  it('useReactAuthKitRouter', ()=>{
    const TestComponent = () => {
      useReactAuthKitRouter();
      return <div id="test">Hi</div>;
    };
    expect(() => render(
        <TestComponent/>,
    )).toThrow(BaseAuthKitError);
  });

  it('useReactAuthKitConfig', ()=>{
    const TestComponent = () => {
      useReactAuthKitConfig();
      return <div id="test">Hi</div>;
    };
    expect(() => render(
        <TestComponent/>,
    )).toThrow(BaseAuthKitError);
  });
});
