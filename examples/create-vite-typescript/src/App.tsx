import createAuthStore from "react-auth-kit/store/createAuthStore";
import {BrowserRouter} from "react-router-dom";
import AuthProvider from "react-auth-kit";
import ReactRouterPlugin from "@auth-kit/react-router/route";
import refreshApi from "./refresh/refresh.tsx";
import RouteComponent from "./RouteComponent.tsx";

const store = createAuthStore("localstorage", {
  authName:'_auth',
  refresh: refreshApi,
  debug: true,
});

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider store={store} router={ReactRouterPlugin} fallbackPath='/login'>
          <RouteComponent/>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
