/*
 * Copyright 2020 Arkadip Bhattacharya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { terser } from "rollup-plugin-terser";
import license from 'rollup-plugin-license';
import filesize from 'rollup-plugin-filesize';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

const licenseBanner = license({
  banner: {
    content: '/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.license %> */',
    commentStyle: 'none',
  },
});

export default [
  {
    input: {
      index: 'src/index.tsx',
      AuthProvider: 'src/AuthProvider.tsx',
      PrivateRoute: 'src/PrivateRoute.tsx',
      useAuth: 'src/hooks/useAuth.ts',
      useAuthHeader: 'src/hooks/useAuthHeader.ts',
      useAuthUser: 'src/hooks/useAuthUser.ts',
      useRefreshToken: 'src/hooks/useRefreshToken.ts',
      useIsAuthenticated: 'src/hooks/useIsAuthenticated.ts',
      useSignIn: 'src/hooks/useSignIn.ts',
      withAuthHeader: 'src/higherOrderComponents/withAuthHeader.tsx',
      withAuthUser: 'src/higherOrderComponents/withAuthUser.tsx',
      withIsAuthenticated: 'src/higherOrderComponents/withIsAuthenticated.tsx',
      withRefreshToken: 'src/higherOrderComponents/withRefreshToken.tsx',
      withSignIn: 'src/higherOrderComponents/withSignIn.tsx',
      withSignOut: 'src/higherOrderComponents/withSignOut.tsx',
    },
    output: [
      {
        dir: "dist/cjs",
        format: 'cjs',
        sourcemap: true,
        exports: "auto"
      },
      {
        dir: "dist/esm",
        format: 'esm',
        sourcemap: true
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      typescript({useTsconfigDeclarationDir: true}),
      terser(),
      filesize(),
    ],
  },
  {
    input: 'src/index.tsx',
    output: [
      {
        file: pkg.unpkg,
        format: 'umd',
        name: 'ReactAuthKit',
        globals: {
          "react": "React",
          "js-cookie": "Cookies",
          "react-router-dom": "ReactRouterDOM"
        },
        sourcemap: true
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      typescript({useTsconfigDeclarationDir: true}),
      terser({output: {comments: false}}),
      licenseBanner,
      filesize(),
    ],
  },
];
