import AuthKitContext from '../AuthContext';
import {
  useReactAuthKitStore,
  useReactAuthKitConfig,
  useReactAuthKitRouter,
} from '../AuthContext';
import {render} from '@testing-library/react';
import Cookies from 'js-cookie';
import {AuthKitProviderMissingError} from "../error";
import {IRouter} from "../route";
import {ITokenStore} from "../store";
import {createCookieTokenStore} from "./helpers/storeCreation";

test('All Expected Exports are there', ()=>{
  expect(AuthKitContext).toBeTruthy();
  expect(useReactAuthKitStore).toBeTruthy();
  expect(useReactAuthKitConfig).toBeTruthy();
  expect(useReactAuthKitRouter).toBeTruthy();
});

test('Testing Context Workflow', ()=>{
  const TestComponent = () => {
    const c = useReactAuthKitStore();
    return <div id="test"> {JSON.stringify(c.value)} </div>;
  };

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
      '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
      '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
  Cookies.set('___auth', token);
  Cookies.set('___auth_type', "Bearer");

  const tokenObject = createCookieTokenStore("__")

  render(
      <AuthKitContext.Provider value={
        {
          store: tokenObject,
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
  Cookies.set('___auth', token);
  Cookies.set('___auth_type', "Bearer");

  const tokenObject = createCookieTokenStore("__")

  render(
      <AuthKitContext.Provider value={
        {
          store: tokenObject,
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
  let tokenObject: ITokenStore<unknown>;
  let AuthProvider: React.FC<React.PropsWithChildren>;

  const navigateFn = jest.fn();

  beforeEach(()=>{
    Cookies.set('___auth', token);
    Cookies.set('___auth_type', "Bearer");

    tokenObject = createCookieTokenStore("__");
    const ReactRouterPlugin: IRouter = {
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
          store: tokenObject,
          router: ReactRouterPlugin,
          config: {fallbackPath: '/login'},
        }
      }>
        {children}
      </AuthKitContext.Provider>);
  });

  it('useReactAuthKitStore', ()=>{
    const TestComponent = () => {
      const c = useReactAuthKitStore();
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
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => jest.fn());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('useReactAuthKitStore', ()=>{
    const TestComponent = () => {
      const c = useReactAuthKitStore();
      return <div id="test"> {JSON.stringify(c.value)} </div>;
    };
    expect(() => render(
        <TestComponent/>,
    )).toThrow(AuthKitProviderMissingError);
  });

  it('useReactAuthKitRouter', ()=>{
    const TestComponent = () => {
      useReactAuthKitRouter();
      return <div id="test">Hi</div>;
    };
    expect(() => render(
        <TestComponent/>,
    )).toThrow(AuthKitProviderMissingError);
  });

  it('useReactAuthKitConfig', ()=>{
    const TestComponent = () => {
      useReactAuthKitConfig();
      return <div id="test">Hi</div>;
    };
    expect(() => render(
        <TestComponent/>,
    )).toThrow(AuthKitProviderMissingError);
  });
});
