# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.13] - 2021-07-30
### Changed:
- Auth state now uses `useReducer` instead of `useState`

## [1.4.12] - 2021-07-25
### Changed:
- PrivateRouteProps is updated to give more type checking

## [1.4.11] - 2021-06-19
### Changed:
- Updated dependencies

### Fixed:
- Deployment of docs

## [1.4.10] - 2021-06-08
### Added:
- Sourcemaps added for each files

### Fixed:
- Type declaration files are missing, so added them

## [1.4.9] - 2021-05-21
### Changed:
- Migrated to @rollup/plugin-typescript
- Terser added for Minified codebase

## [1.4.8] - 2021-05-07
### Fixed:
- `authdata.md` wrong doc of useAuthUser (70e8d8839bb50e0f524815c16827efe9dd8da615)
- Property 'user' does not exist on type 'object' (#343)

## [1.4.7] - 2021-04-11
### Changed:
- `AuthProvider` props. AuthProvider is now only using 4 props.
- Docs `/usage` is now `/integration`
- Docs updated Intro and installation page
- Better documentations added.

⚠️This release will break your code, as the AuthProvider props are changed. [Please refer to the docs](https://authkit.arkadip.me/integration)


## [1.4.6] - 2021-04-09
### Changed:
- Docs updated

## [1.4.5] - 2021-02-10
### Fixed:
- Potential risk of duplicate tokens

## [1.4.4] - 2021-01-15
### Fixed:
- `authToken` and `authTokenType` key value pair swapped at `getCurrentAuthState()` in `RefreshToken` ([#197](https://github.com/react-auth-kit/react-auth-kit/issues/197)) ([8fc03f5](https://github.com/react-auth-kit/react-auth-kit/commit/8fc03f5cf90fb9372137fa85def7e3194196a1d7))

### Thanks:
- [**@philbert440**](https://github.com/philbert440)

## [1.4.3] - 2021-01-05
### Added:
- Store Refresh Token for refreshing JWT

### Thanks:
- [**@shackra**](https://github.com/shackra)

## [1.4.0] - 2020-12-20
### Added:
- Added Refresh Token feature

## [1.3.4] - 2020-12-18
### Added:
- Support for React 17

## [1.3.2] - 2020-12-17
### Fixed:
- AuthProvider children type changed to `React.ReactNode`

## [1.3.1] - 2020-12-17
### Added:
- Types added in npm release for better code completion.

## [1.3.0] - 2020-12-17
### Added:
- Code base documentation. ([Hardik0307](https://github.com/Hardik0307))
- Guideline for Contribution added on project website ([dotslash21](https://github.com/dotslash21))

### Fixed:
- Eslint Linting issue
- Contributing.md typo fix. ([dotslash21](https://github.com/dotslash21))

## [1.2.2] - 2020-09-21
### Fixed
- DOCS SEO

## [1.2.1] - 2020-09-16
### Fixed
- `TS Function declararation`

## [1.2.0] - 2020-09-15
### Added
- `useAuth` function added. Now use all hooks in 1 function.

### Fixed
- Docs: Deprecated AuthProvider params names
- `AuthProvider` pushing error for cookieSecure set as false
- `useSignIn` function parameter
- `withSignIn` function param

## [1.1.7] - 2020-09-14
### Added
- `useIsAuthenticated` and `withIsAuthenticated` added. Now check if your user is logged in or not.

### Changed
- ⚠ `useAuth` is changed to `useAuthUser`
- ⚠ `withAuth` is changed to `withAuthUser`

## [1.1.6] - 2020-09-12
### Fixed
- Linting the Codes

### Changed
- Docs Override dir to `docs` dir

## [1.1.5] - 2020-09-12
### Fixed
- Docs Meta Tags Fixed
- Docs Site Map Fixed

## [1.1.4] - 2020-09-12
### Added
- SEO added in docs

## [1.1.3] - 2020-09-10
### Fixed
- Type Definition

### Changed
- Size decreased from 2.12 KB to 1.81 KB

## [1.1.2] - 2020-09-10
### Changed
- AuthContext is merged with AuthProvider

## [1.1.1] - 2020-09-08
### Added
- Documentation [https://authkit.arkadip.co](https://authkit.arkadip.co)
- Default props for `AuthProvider`

## [1.1.0] - 2020-09-08
### Added
- Local Storage Added (Cookie and LocalStorage can be chosen by AuthProvider Prop `authStorageType`)
- Documentation [https://authkit.arkadip.co](https://authkit.arkadip.co)
- PrivateRoute now supports render and component props
- Auth Token Type added on Sign In. Default `Bearer`

### Changed
- `Sign In` function Arguments is now an object

## [1.0.2] - 2020-08-29
### Added
- UMD module
- Testing Added

### Removed
- JS Map files

## [1.0.1] - 2020-08-28
### Added
- Code Base Added
- Bundling with Rollup

## [1.0.0] - 2020-08-27
### Added
- Package Established
