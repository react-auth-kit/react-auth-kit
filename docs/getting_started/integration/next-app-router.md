---
title: Next.Js App Router
description: Easily integrate the ease and power of React Auth Kit into your Next.Js Application.
---

# :simple-nextdotjs:{ .lg .middle .label-color} Next.JS App Router

React Auth Kit provides an easy way to enable authentication in a Next.Js Application. After integration, you can use all the React Auth Kit core functionalities in the Next App.

!!! info

    As of now, React Auth Kit only supports `Client Side Rendering(CSR)` of User Data and redirection. Implementation of Server Side Rendering(SSR) will be implemented in the future release.

<div data-ea-publisher="authkitarkadipme" data-ea-type="text" id="integration_next"></div>

---

## Store Creation


To use React Auth Kit in the application, we first need to create the store that holds the data for our application. You can create the store in a separate file.

### Import

```js title="Import authStore in your app" linenums="1"
import authStore from 'react-auth-kit/store';
```

### Usage

```js title="src/store.{js|ts}" linenums="1"
const store = authStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});
```

## Provider

React Auth Kit uses React's context Provider API. So we'll use the provided guide by Varcel to implement context API in the Next.js application. [Read the vercel provided blog](https://vercel.com/guides/react-context-state-management-nextjs)

In the Provider file, we'll initialize the AuthProvider and pass the store.

```jsx title="app/provider.js" linenums="1"
"use client"; // (1)

import React from 'react';
import authStore from 'react-auth-kit/store';
import AuthProvider from 'react-auth-kit/AuthProvider';

const store = authStore({
    authName:"__auth",
    authType:"cookie",
    cookieDomain:'127.0.0.1',
    cookieSecure:false,
})

const Providers = ({
    children,
  }: {
    children: React.ReactNode
  }) => {

  return (
    <AuthProvider store={store}>
      {children}
    </AuthProvider>
  )
}

export default Providers;
```

1.  :man_raising_hand: We are required to use `use client;`, because the provider will only render on the client side.

## Integrate with the Application

We now have to take the `Provider`, and integrate it with the `RootLayout` so use it in the application. Providers added in the `RootLayout` are visible throughout the application.

```jsx
import Providers from './providers'; // (1)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers> // (2)
      <html lang="en">
        <body>
            {children}
        </body>
      </html>
    </Providers>
  )
}

```

1. Importing the previously created `Providers` component.
2. Wrap the whole Application inside the Provider.

## Example

The complete example is available in [examples/create-next-ts-route](https://github.com/react-auth-kit/react-auth-kit/tree/master/examples/create-next-ts-route)

## API

- [authStore](../../reference/react-auth-kit/authStore.md)
- [AuthProvider](./../../reference/react-auth-kit/authprovider.md)


---

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">MIT License</a> code</i></p>
