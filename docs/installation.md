# Installation

React-Auth-Kit is available as a [npm package](https://www.npmjs.com/package/react-auth-kit)

<div data-ea-publisher="authkitarkadipme" data-ea-type="text"></div>

## npm :fontawesome-brands-npm:
To install and save in your `package.json` dependencies, run:
```bash
//with npm
npm install --save react-auth-kit

//with yarn
yarn add react-auth-kit
```
Please note that [react](https://www.npmjs.com/package/react) >= 16,
[js-cookie](https://www.npmjs.com/package/js-cookie) = 2.2.1 and
[react-router-dom](https://www.npmjs.com/package/react-router-dom) = 5.2.0 are peer dependencies.

##CDN

You can start using React-Auth-Kit with minimal infrastructure, which is great for prototyping.

Two Universal Module Definition (**UMD**) files are provided:

- **unpkg**: [https://unpkg.com/react-auth-kit/dist/index.umd.js](https://unpkg.com/react-auth-kit/dist/index.umd.js)
  - **jsdelivr**: [https://cdn.jsdelivr.net/npm/react-auth-kit/dist/index.umd.js](https://cdn.jsdelivr.net/npm/react-auth-kit/dist/index.umd.js)

    [![](https://data.jsdelivr.com/v1/package/npm/react-auth-kit/badge)](https://www.jsdelivr.com/package/npm/react-auth-kit)

You can follow [this CDN example](https://github.com/react-auth-kit/react-auth-kit/tree/master/examples/cdn)
to quickly get started.

!!! warning ""

    Using this approach in `production` is `discouraged` though - the client has to download the entire library,
    regardless of which components are actually used, affecting performance and bandwidth utilization.

!!! danger ""

    The UMD links are using the `latest` tag to point to the latest version of the library. This pointer is `unstable`,
    it shifts as we release new versions. You should consider pointing to a specific version,
    such as [v1.4.6](https://unpkg.com/react-auth-kit@1.4.6/dist/index.umd.js).

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">
Apache 2.0 License</a> code</i></p>
