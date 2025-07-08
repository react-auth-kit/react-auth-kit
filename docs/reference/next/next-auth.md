---
title: NextAuth - next - React Auth Kit
description: "@auth-kit/next/NextAuth"
---

# AuthOutlet

<div data-ea-publisher="authkitarkadipme" data-ea-type="text" id="ref_nextAuth"></div>

## Import

```js
import NextAuth from '@auth-kit/next/NextAuth'
```

## Function Signature

**NextAuth**(`#!js {fallbackPath: string}`): `React.ReactNode`

NextAuth provides an easy solution to implement private route solutions using the Next.js route system

## Parameters

| Name | Type | Description |
| :------ | :------ | :--------- |
| `fallbackPath` | `string` | Path to redirect if the user is not authenticated  |

## Example

Wrap the children of the secure layout in the `NextAuth` to make the page private.

If the user is authenticated, then the route will be visible to the user, else the user will be redirected to the fallback path provided.

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

#### Defined in

[packages/next/src/NextAuth.tsx](https://github.com/react-auth-kit/react-auth-kit)

---

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">MIT License</a> code</i></p>

