# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
