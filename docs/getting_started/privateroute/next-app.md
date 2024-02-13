---
title: Next.Js App Router - Private Route
description: 
---

# :simple-nextdotjs: Next.Js App Router Private Route 

!!! danger ""

    Usage of Next.Js Private router will make the page render on the _client side only_, it eliminates the server-side rendering for the page.
    This is done purposefully to make sure no _hydration error_ occurs.

## Installation

To use Private Route with Next.Js, you need to install the `next plugin` for react auth kit.

To install and save in your `package.json` dependencies, run:

=== ":simple-npm: npm"

    ```bash title="Install With NPM"  linenums="1"
    npm install --save @auth-kit/next
    ```

=== ":simple-yarn: yarn"

    ```bash title="Install With Yarn" linenums="1"
    yarn add @auth-kit/next
    ```

=== ":simple-pnpm: pnpm"

    ```bash title="Install With PNPM"  linenums="1"
    pnpm install --save @auth-kit/next
    ```

## Usage

To make a page private, react-auth-kit included a component `NextAuth`.
By simply wrapping the `page.jsx` or `layout.jsx` into the _NextAuth_ will make the page secure from unauthorized access.
It works seamlessly on any number of pages.

Provide the `fallbackPath` prop in the NextAuth while using the component. 
If the user is not authorized, the page will be redirected to the fallback path.


```jsx title="layout.jsx"
// Implement in the layout.jsx
import NextAuth from '@auth-kit/next/NextAuth';

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return <NextAuth fallbackPath={'/login'}>{children}</NextAuth>
}
```

```jsx title="page.jsx"
// Implement in the page.jsx
import NextAuth from '@auth-kit/next/NextAuth';

export default function Page() {
    return (
        <NextAuth fallbackPath={'/login'}>
            ...
        </NextAuth>
    );
}
```

## Reference

[NextAuth](./../../reference/next/next-auth.md)

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">Apache 2.0 License</a> code</i></p>
