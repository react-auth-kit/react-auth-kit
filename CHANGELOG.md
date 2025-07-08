## [3.1.2](https://github.com/react-auth-kit/react-auth-kit/compare/v3.1.1...v3.1.2) (2024-02-19)


### Fixes

* **User Data Serialization:** User Data cookie deserialization issue. `JSON.parse` error fixed
* **debugger added:** Added `debug=true` param on the createStore to debug the entire auth flow


## [3.1.1](https://github.com/react-auth-kit/react-auth-kit/compare/v3.1.0...v3.1.1) (2024-02-15)


### Fixes

* **AuthProvider Type Issue:** Fixed type error with Store and AuthProvider prop
* **createStore param:** Robust cookieDomain and cookieSecure parameter check for cookie type


## [3.1.0](https://github.com/react-auth-kit/react-auth-kit/compare/v3.0.1...v3.1.0) (2024-02-13)

🎉 Next.Js Support is there!! 🎉

### Features

* **Next.Js:** Added support for Next.Js.
* **@auth-kit/next:** New Package for Rect Auth Kit for Next.Js


## [3.0.1](https://github.com/react-auth-kit/react-auth-kit/compare/v3.0.0...v3.0.1) (2024-01-09)


### Features

* **Docs:** Added import statements in the reference docs.
* **Deps:** Updated all the dependencies with latest once.

## [3.0.0](https://github.com/react-auth-kit/react-auth-kit/compare/v2.12.7...v3.0.0) (2024-01-07)


### Features

* **RxJS:** Using RxJS Based Token Store for Better Performance.
* **Tree Stacking:** Using Tree Stacked Codebase for smaller build
* **MonoRepo:** Extendable Monorepo based Achitecture

## [2.12.7](https://github.com/react-auth-kit/react-auth-kit/compare/v2.12.6...v2.12.7) (2023-09-18)


### Bug Fixes

* **deps:** update dependency react-router-dom to v6.16.0 ([a5ceff1](https://github.com/react-auth-kit/react-auth-kit/commit/a5ceff169dfba0eeb8981356bbd43f60a79c24ca))

## [2.12.6](https://github.com/react-auth-kit/react-auth-kit/compare/v2.12.5...v2.12.6) (2023-08-10)


### Bug Fixes

* **deps:** update dependency react-router-dom to v6.15.0 ([1b9fdb8](https://github.com/react-auth-kit/react-auth-kit/commit/1b9fdb88c8d8f75f9dfa2e38bb9b42848ccc4584))

## [2.12.5](https://github.com/react-auth-kit/react-auth-kit/compare/v2.12.4...v2.12.5) (2023-08-02)


### Bug Fixes

* **deps:** update dependency react-router-dom to v6.14.2 ([47ffed5](https://github.com/react-auth-kit/react-auth-kit/commit/47ffed5f5a33da390a84975abdcb726066cb03fd))

## [2.12.4](https://github.com/react-auth-kit/react-auth-kit/compare/v2.12.3...v2.12.4) (2023-07-14)


### Bug Fixes

* **deps:** update dependency react-router-dom to v6.14.1 ([d60aa7a](https://github.com/react-auth-kit/react-auth-kit/commit/d60aa7a2538344ae685c0ed6cb1db7e15eef3769))

## [2.12.3](https://github.com/react-auth-kit/react-auth-kit/compare/v2.12.2...v2.12.3) (2023-06-21)


### Bug Fixes

* **deps:** update dependency js-cookie to v3.0.5 ([c670aa5](https://github.com/react-auth-kit/react-auth-kit/commit/c670aa517a055c1cf94c90516009b45e39d473d2))
* **deps:** update dependency react-router-dom to v6.13.0 ([23518bc](https://github.com/react-auth-kit/react-auth-kit/commit/23518bc821417c3c7f162a3ceeb476bc51fbf15f))

## [2.12.2](https://github.com/react-auth-kit/react-auth-kit/compare/v2.12.1...v2.12.2) (2023-04-16)


### Bug Fixes

* **isauthenticated:** removed signout ([ea58d41](https://github.com/react-auth-kit/react-auth-kit/commit/ea58d4165f2bd01b5c6b282049728164656cf983))

## [2.12.2-beta.1](https://github.com/react-auth-kit/react-auth-kit/compare/v2.12.1...v2.12.2-beta.1) (2023-04-16)


### Bug Fixes

* **isauthenticated:** removed signout ([ea58d41](https://github.com/react-auth-kit/react-auth-kit/commit/ea58d4165f2bd01b5c6b282049728164656cf983))

## [2.12.1](https://github.com/react-auth-kit/react-auth-kit/compare/v2.12.0...v2.12.1) (2023-04-15)


### Bug Fixes

* **docs:** added google cloud docs uri ([7709cf4](https://github.com/react-auth-kit/react-auth-kit/commit/7709cf4dba3a636917b952468c40704ace8fbb20))

# [2.12.0](https://github.com/react-auth-kit/react-auth-kit/compare/v2.11.0...v2.12.0) (2023-04-15)


### Bug Fixes

* linting ([de9e60c](https://github.com/react-auth-kit/react-auth-kit/commit/de9e60c031dbb652635ba1d4090b2909c0d032a8))


### Features

* **error:** created a new error ([de2a959](https://github.com/react-auth-kit/react-auth-kit/commit/de2a95908becbc1ed88ef74cbed45ffc51e867a5))
* **hoc:** added isAuthenticated ([fd5f45a](https://github.com/react-auth-kit/react-auth-kit/commit/fd5f45a461edfdc1a83be89f688e9d6c6f8eff67))
* **hoc:** updated error to new error ([6550f95](https://github.com/react-auth-kit/react-auth-kit/commit/6550f95be04b2740ad3ecbf65ef12bb21dcf241b))
* **hooks:** added isAuthenticated ([02d0f39](https://github.com/react-auth-kit/react-auth-kit/commit/02d0f3991f301f44454ddcac9be3aadaf5f4b265))
* **hooks:** updated error to new error ([afcf0f2](https://github.com/react-auth-kit/react-auth-kit/commit/afcf0f256da5bb42fe7c31f4a89b3f4c1aaae51b))
* **husky:** updated hooks to executable ([524ae70](https://github.com/react-auth-kit/react-auth-kit/commit/524ae7088d6b3d36aec9409e63d7884a65ee6e03))
* **package.json:** added new dependency ([9ffcb12](https://github.com/react-auth-kit/react-auth-kit/commit/9ffcb12faebaab45c9436fb76b321a72425e8322))
* **privateroute:** updated RequireAuth ([ccc8a78](https://github.com/react-auth-kit/react-auth-kit/commit/ccc8a78a81c041397a5d23615ca2cff144f8e5bc))
* **utils:** added isAuthenticated function ([ef8a357](https://github.com/react-auth-kit/react-auth-kit/commit/ef8a3575a3f5f1f639bd1f963b821d0a90bce3a2))

# [2.12.0-beta.1](https://github.com/react-auth-kit/react-auth-kit/compare/v2.11.0...v2.12.0-beta.1) (2023-04-15)


### Bug Fixes

* linting ([de9e60c](https://github.com/react-auth-kit/react-auth-kit/commit/de9e60c031dbb652635ba1d4090b2909c0d032a8))


### Features

* **error:** created a new error ([de2a959](https://github.com/react-auth-kit/react-auth-kit/commit/de2a95908becbc1ed88ef74cbed45ffc51e867a5))
* **hoc:** added isAuthenticated ([fd5f45a](https://github.com/react-auth-kit/react-auth-kit/commit/fd5f45a461edfdc1a83be89f688e9d6c6f8eff67))
* **hoc:** updated error to new error ([6550f95](https://github.com/react-auth-kit/react-auth-kit/commit/6550f95be04b2740ad3ecbf65ef12bb21dcf241b))
* **hooks:** added isAuthenticated ([02d0f39](https://github.com/react-auth-kit/react-auth-kit/commit/02d0f3991f301f44454ddcac9be3aadaf5f4b265))
* **hooks:** updated error to new error ([afcf0f2](https://github.com/react-auth-kit/react-auth-kit/commit/afcf0f256da5bb42fe7c31f4a89b3f4c1aaae51b))
* **husky:** updated hooks to executable ([524ae70](https://github.com/react-auth-kit/react-auth-kit/commit/524ae7088d6b3d36aec9409e63d7884a65ee6e03))
* **package.json:** added new dependency ([9ffcb12](https://github.com/react-auth-kit/react-auth-kit/commit/9ffcb12faebaab45c9436fb76b321a72425e8322))
* **privateroute:** updated RequireAuth ([ccc8a78](https://github.com/react-auth-kit/react-auth-kit/commit/ccc8a78a81c041397a5d23615ca2cff144f8e5bc))
* **utils:** added isAuthenticated function ([ef8a357](https://github.com/react-auth-kit/react-auth-kit/commit/ef8a3575a3f5f1f639bd1f963b821d0a90bce3a2))

# [2.11.0-beta.3](https://github.com/react-auth-kit/react-auth-kit/compare/v2.11.0-beta.2...v2.11.0-beta.3) (2023-04-10)



### Bug Fixes


* linting ([de9e60c](https://github.com/react-auth-kit/react-auth-kit/commit/de9e60c031dbb652635ba1d4090b2909c0d032a8))



### Features

* **error:** created a new error ([de2a959](https://github.com/react-auth-kit/react-auth-kit/commit/de2a95908becbc1ed88ef74cbed45ffc51e867a5))
* **hoc:** added isAuthenticated ([fd5f45a](https://github.com/react-auth-kit/react-auth-kit/commit/fd5f45a461edfdc1a83be89f688e9d6c6f8eff67))
* **hoc:** updated error to new error ([6550f95](https://github.com/react-auth-kit/react-auth-kit/commit/6550f95be04b2740ad3ecbf65ef12bb21dcf241b))
* **hooks:** added isAuthenticated ([02d0f39](https://github.com/react-auth-kit/react-auth-kit/commit/02d0f3991f301f44454ddcac9be3aadaf5f4b265))
* **hooks:** updated error to new error ([afcf0f2](https://github.com/react-auth-kit/react-auth-kit/commit/afcf0f256da5bb42fe7c31f4a89b3f4c1aaae51b))
* **husky:** updated hooks to executable ([524ae70](https://github.com/react-auth-kit/react-auth-kit/commit/524ae7088d6b3d36aec9409e63d7884a65ee6e03))
* **package.json:** added new dependency ([9ffcb12](https://github.com/react-auth-kit/react-auth-kit/commit/9ffcb12faebaab45c9436fb76b321a72425e8322))
* **privateroute:** updated RequireAuth ([ccc8a78](https://github.com/react-auth-kit/react-auth-kit/commit/ccc8a78a81c041397a5d23615ca2cff144f8e5bc))
* **utils:** added isAuthenticated function ([ef8a357](https://github.com/react-auth-kit/react-auth-kit/commit/ef8a3575a3f5f1f639bd1f963b821d0a90bce3a2))

# [2.11.0-beta.2](https://github.com/react-auth-kit/react-auth-kit/compare/v2.11.0-beta.1...v2.11.0-beta.2) (2023-04-08)


### Bug Fixes

* changed folder ([b97859f](https://github.com/react-auth-kit/react-auth-kit/commit/b97859f1852a755b78a4cc9e680eaeec77f5ee6d))

# [2.11.0-beta.1](https://github.com/react-auth-kit/react-auth-kit/compare/v2.10.1...v2.11.0-beta.1) (2023-04-08)


### Features

* adding tree stacking ([7b17802](https://github.com/react-auth-kit/react-auth-kit/commit/7b17802dbf132d8b2a92fad46fc2feedc8e7bcd5))

## [2.10.1](https://github.com/react-auth-kit/react-auth-kit/compare/v2.10.0...v2.10.1) (2023-04-05)


### Bug Fixes

* ads not visiable in pages ([9442afb](https://github.com/react-auth-kit/react-auth-kit/commit/9442afbb2ed047b86a2fe4db467afba821dd5ec7))

# [2.10.0](https://github.com/react-auth-kit/react-auth-kit/compare/v2.9.0...v2.10.0) (2023-03-28)


### Features

* **docs:** added _headers file ([cd94db7](https://github.com/react-auth-kit/react-auth-kit/commit/cd94db7a4ec054af465523229f719306c6dcac84))

# [2.9.0](https://github.com/react-auth-kit/react-auth-kit/compare/v2.8.3...v2.9.0) (2023-03-24)


### Features

* **example.refresh:** updated version ([b6a77f0](https://github.com/react-auth-kit/react-auth-kit/commit/b6a77f0ed3cd052c2562aba05fbcf926f29b881e))
* **example:** added axios mock in refresh ([5d5cb9c](https://github.com/react-auth-kit/react-auth-kit/commit/5d5cb9cf8e206e213c2a694ebe241fa790ba25da))
* **example:** added better refresh function ([32f762b](https://github.com/react-auth-kit/react-auth-kit/commit/32f762ba51c09e9c0092ac62673dd9c1d2c90889))

## [2.8.3](https://github.com/react-auth-kit/react-auth-kit/compare/v2.8.2...v2.8.3) (2023-03-21)


### Bug Fixes

* **tsconfig.json:** removed supress index ([a2a1d60](https://github.com/react-auth-kit/react-auth-kit/commit/a2a1d601721c212ddbcfed4cd2e260db43ca43e5))

## [2.8.2](https://github.com/react-auth-kit/react-auth-kit/compare/v2.8.1...v2.8.2) (2023-02-26)


### Bug Fixes

* updated jest version to 29 ([2a86a00](https://github.com/react-auth-kit/react-auth-kit/commit/2a86a0040f7a537c5e3c2cf08688db24afc679ac))

## [2.8.1](https://github.com/react-auth-kit/react-auth-kit/compare/v2.8.0...v2.8.1) (2023-02-25)


### Bug Fixes

* removed codecov ([40e6283](https://github.com/react-auth-kit/react-auth-kit/commit/40e62830c0c877bcafdd017351ddbf4d84038571))

# [2.8.0](https://github.com/react-auth-kit/react-auth-kit/compare/v2.7.1...v2.8.0) (2023-02-25)


### Bug Fixes

* removed Node 14.x support ([daa3ffc](https://github.com/react-auth-kit/react-auth-kit/commit/daa3ffc306b25c6ec83562671883cc54bbe46e0e))


### Features

* updated react and react-dom version to 18 ([46ad886](https://github.com/react-auth-kit/react-auth-kit/commit/46ad886d05d94255d9f7893fbc80ba5743b2d83d))

## [2.7.1](https://github.com/react-auth-kit/react-auth-kit/compare/v2.7.0...v2.7.1) (2022-12-04)


### Bug Fixes

* update the rollup config to use new package ([be69f86](https://github.com/react-auth-kit/react-auth-kit/commit/be69f86c30498f846005a2c88cdab74bddf4aee1))
* updated the package ([9fd1310](https://github.com/react-auth-kit/react-auth-kit/commit/9fd13105f486aadaf2e682af1c175584549575b6))

# [2.7.0](https://github.com/react-auth-kit/react-auth-kit/compare/v2.6.2...v2.7.0) (2022-10-30)


### Bug Fixes

* **docs.authdata:** added description ([ad5da29](https://github.com/react-auth-kit/react-auth-kit/commit/ad5da2976c491cf5b612e239eabc7516eb923cb3))
* **docs.authheader:** added description ([f9550fe](https://github.com/react-auth-kit/react-auth-kit/commit/f9550fe710e4b29aed42d8d78265e4223745524d))
* **docs.checkauth:** added description ([857d313](https://github.com/react-auth-kit/react-auth-kit/commit/857d3139c573afaa078e9cc832472353bd8508c8))
* **docs.integration:** added description ([825f4fb](https://github.com/react-auth-kit/react-auth-kit/commit/825f4fb0d5bae4d4f024027b7882ad3ef38e8f7c))
* **docs.privateroute:** added description ([c0c7050](https://github.com/react-auth-kit/react-auth-kit/commit/c0c7050b312eb8275f7f45459e5ac1e1fab56794))
* **docs.refreshtoken:** added description ([265b9b2](https://github.com/react-auth-kit/react-auth-kit/commit/265b9b29844f2fc9cbfebc846f8e67af0eb81a41))


### Features

* index description updated ([1989a31](https://github.com/react-auth-kit/react-auth-kit/commit/1989a31474345a7ea6c04723a3e4fbed89b9c726))

## [2.6.2](https://github.com/react-auth-kit/react-auth-kit/compare/v2.6.1...v2.6.2) (2022-10-26)


### Bug Fixes

* **docs:** updated readme ([4aa4b24](https://github.com/react-auth-kit/react-auth-kit/commit/4aa4b2431f351678b06434dcf524f00f7999d8f6))

## [2.6.1](https://github.com/react-auth-kit/react-auth-kit/compare/v2.6.0...v2.6.1) (2022-10-26)


### Bug Fixes

* again ([349abe4](https://github.com/react-auth-kit/react-auth-kit/commit/349abe48d2bdfc09f2771794bfcbc75679f0769c))
* **authProvider:** indentation ([48607fd](https://github.com/react-auth-kit/react-auth-kit/commit/48607fd70acfcc877e351da2f3c69c2083e579ea))
* **authProvider:** indentation ([ad4bda7](https://github.com/react-auth-kit/react-auth-kit/commit/ad4bda70b2a4e0355f702ce61c2aaaaa7cc916a4))
* **commitlintConfig:** code quality ([6ab1fdd](https://github.com/react-auth-kit/react-auth-kit/commit/6ab1fddd28acb0f38a345d5688b75fcc28d66cc8))
* **commitlintConfig:** eslint rule ([b4f1051](https://github.com/react-auth-kit/react-auth-kit/commit/b4f105115cad2f73046e3282770f47d269025d4e))
* **tokenObject:** added semicolons ([0e8b30b](https://github.com/react-auth-kit/react-auth-kit/commit/0e8b30b16a12497a8acf6dc0242158169f79cb21))

# [2.6.0](https://github.com/react-auth-kit/react-auth-kit/compare/v2.5.0...v2.6.0) (2022-10-24)


### Bug Fixes

* npm icon was missing ([1537610](https://github.com/react-auth-kit/react-auth-kit/commit/153761019e0e4ade7ef773bc24c3b48b570bd8c6))
* updated OG urls ([8557240](https://github.com/react-auth-kit/react-auth-kit/commit/85572403641325fd1e095591fd0c67dc68eff7ee))


### Features

* added following table of contant ([3d9a2f3](https://github.com/react-auth-kit/react-auth-kit/commit/3d9a2f3d7f781316349c9a7fbe4575e5c96948e0))
* added some more key feature of auth kit ([dc683fc](https://github.com/react-auth-kit/react-auth-kit/commit/dc683fc80e137b103d3896fb086a378bd7470ce9))
* added suitable title and descriptions ([831da01](https://github.com/react-auth-kit/react-auth-kit/commit/831da01db0b0dda812f63739204b7a17716a25b8))
* added tabs ([8d3863f](https://github.com/react-auth-kit/react-auth-kit/commit/8d3863fa407b22e7771a329eef99810e83d50eed))
* added the description for installation ([40fbbce](https://github.com/react-auth-kit/react-auth-kit/commit/40fbbce838daf15f52420257fd6475aecc123dd7))
* Installation MD is updated ([c6213e9](https://github.com/react-auth-kit/react-auth-kit/commit/c6213e9c538696081e5eaf97239f99a3dffa22e9))
* updated site description ([64fcab2](https://github.com/react-auth-kit/react-auth-kit/commit/64fcab2a8612c7921696a4384dd4472494040a2c))
* updated the sign-in page ([7e8dc75](https://github.com/react-auth-kit/react-auth-kit/commit/7e8dc7537b004a3967fc0ca733e5751f37d8e0db))

# [2.5.0](https://github.com/react-auth-kit/react-auth-kit/compare/v2.4.0...v2.5.0) (2022-10-18)


### Features

* added dar theme in the theme ([9937e41](https://github.com/react-auth-kit/react-auth-kit/commit/9937e410681f6d2ef4e56a9c01deca108b54fa88))

# [2.4.0](https://github.com/react-auth-kit/react-auth-kit/compare/v2.3.0...v2.4.0) (2022-10-06)


### Bug Fixes

* lint on docs folder ([22c96ee](https://github.com/react-auth-kit/react-auth-kit/commit/22c96eebb49deacc7f47160c2dca3373ae03ed41))


### Features

* add linting scripts to package.json ([333ed2d](https://github.com/react-auth-kit/react-auth-kit/commit/333ed2d46fdecfb5d392676fcb2e277e542f09d1))
* add markdownlint config ([d5ad1b7](https://github.com/react-auth-kit/react-auth-kit/commit/d5ad1b77a25111fc19bf53437ae352f367eb1e09))
* add markdownlint-cli ([1842346](https://github.com/react-auth-kit/react-auth-kit/commit/1842346bb313c4a29b3dcf69a004ec7cc7c44652))

# [2.3.0](https://github.com/react-auth-kit/react-auth-kit/compare/v2.2.0...v2.3.0) (2022-09-28)


### Features

* **package.json:** update [@types](https://github.com/types) package ([de97cd6](https://github.com/react-auth-kit/react-auth-kit/commit/de97cd6ff351e425490bab06d573473be230279e))

# [2.2.0](https://github.com/react-auth-kit/react-auth-kit/compare/v2.1.4...v2.2.0) (2022-09-28)


### Bug Fixes

* docs sitemap fix ([d96bfe2](https://github.com/react-auth-kit/react-auth-kit/commit/d96bfe2b588a80fc394100e68e5242f924f62ffa))


### Features

* **package.json:** added some essential fields ([e64f135](https://github.com/react-auth-kit/react-auth-kit/commit/e64f135e6886469841a0dacdb93f9d6a0ae4658e))

## [2.1.4](https://github.com/react-auth-kit/react-auth-kit/compare/v2.1.3...v2.1.4) (2022-09-26)


### Bug Fixes

* removed Node 12 from CI ([58cb504](https://github.com/react-auth-kit/react-auth-kit/commit/58cb504ff9061d29769e6a36cce5a9b6bb05d058))

## [2.1.3](https://github.com/react-auth-kit/react-auth-kit/compare/v2.1.2...v2.1.3) (2022-09-26)


### Bug Fixes

* updated all occurance of .me domain ([8342121](https://github.com/react-auth-kit/react-auth-kit/commit/8342121ade72bb5f67eea66cff897fd0615bf29a))

## [2.1.2](https://github.com/react-auth-kit/react-auth-kit/compare/v2.1.1...v2.1.2) (2022-09-16)


### Bug Fixes

* updated the docs CNAME ([bf643f3](https://github.com/react-auth-kit/react-auth-kit/commit/bf643f3af9dc88e3072bb5bc3272d1d7a66c8a9c))

## [2.1.1](https://github.com/react-auth-kit/react-auth-kit/compare/v2.1.0...v2.1.1) (2022-09-05)


### Bug Fixes

* upgrade @testing-library/jest-dom from 5.16.2 to 5.16.5 ([0886f2d](https://github.com/react-auth-kit/react-auth-kit/commit/0886f2db26379d36542772b6ebf23ba6a743b010))

# [2.1.0](https://github.com/react-auth-kit/react-auth-kit/compare/v2.0.5...v2.1.0) (2022-04-29)


### Features

* **package:** added react 18 in peer dep ([2f0610f](https://github.com/react-auth-kit/react-auth-kit/commit/2f0610f23d29952cba8739ec0fb99d1df92107b8))

## [2.0.5](https://github.com/react-auth-kit/react-auth-kit/compare/v2.0.4...v2.0.5) (2022-03-27)


### Bug Fixes

* upgrade react-router-dom from 6.2.1 to 6.2.2 ([eae910f](https://github.com/react-auth-kit/react-auth-kit/commit/eae910f81732b8d68d55f409cdbd529d5ad1e7a0))

## [2.0.4](https://github.com/react-auth-kit/react-auth-kit/compare/v2.0.3...v2.0.4) (2022-03-07)


### Bug Fixes

* upgrade @testing-library/jest-dom from 5.16.1 to 5.16.2 ([1abed3c](https://github.com/react-auth-kit/react-auth-kit/commit/1abed3cef036ec381255c01fdcdabfb06473531e))

## [2.0.3](https://github.com/react-auth-kit/react-auth-kit/compare/v2.0.2...v2.0.3) (2022-02-25)


### Bug Fixes

* upgrade @testing-library/jest-dom from 5.16.1 to 5.16.2 ([356630a](https://github.com/react-auth-kit/react-auth-kit/commit/356630acb77ddc0c282302cbf2c2d7c771132105))

## [2.0.2](https://github.com/react-auth-kit/react-auth-kit/compare/v2.0.1...v2.0.2) (2022-02-20)


### Bug Fixes

* **docs:** added the private route docs ([60ad979](https://github.com/react-auth-kit/react-auth-kit/commit/60ad979967549db78f38ff8808a7c81840b15057))
* **docs:** added the update route ([3b10226](https://github.com/react-auth-kit/react-auth-kit/commit/3b1022679c709e560f01f1d99f1277a8cb126209))

## [2.0.1](https://github.com/react-auth-kit/react-auth-kit/compare/v2.0.0...v2.0.1) (2022-02-20)


### Bug Fixes

* **examples:** updated examples as per needed ([75f2412](https://github.com/react-auth-kit/react-auth-kit/commit/75f24122219f5de15c3447f1354b5f87440b8369))

# [2.0.0](https://github.com/react-auth-kit/react-auth-kit/compare/v1.6.13...v2.0.0) (2022-02-19)


### Performance Improvements

* **privateRoute:** updated to react router v6 ([92fcde6](https://github.com/react-auth-kit/react-auth-kit/commit/92fcde67bcb91ff478387146d7c3ae217c90dced))


### BREAKING CHANGES

* **privateRoute:** The PrivateRoute.tsx Option will not available for now.

Signed-off-by: Arkadip <hi@arkadip.dev>

## [1.6.13](https://github.com/react-auth-kit/react-auth-kit/compare/v1.6.12...v1.6.13) (2022-01-17)


### Bug Fixes

* docs ads ([f494902](https://github.com/react-auth-kit/react-auth-kit/commit/f494902149d4726e8df35f4721ce0166a79f4137))
* project housekeeping ([4b14569](https://github.com/react-auth-kit/react-auth-kit/commit/4b145693ad436914b50bc350952e24ee67b62cc9))

## [1.6.12](https://github.com/react-auth-kit/react-auth-kit/compare/v1.6.11...v1.6.12) (2022-01-16)


### Bug Fixes

* upgrade react-auth-kit from 1.6.2 to 1.6.4 ([5483e33](https://github.com/react-auth-kit/react-auth-kit/commit/5483e33ec42cb97bcb230546824d1fa6104564b7))

## [1.6.11](https://github.com/react-auth-kit/react-auth-kit/compare/v1.6.10...v1.6.11) (2022-01-16)


### Bug Fixes

* upgrade @testing-library/jest-dom from 5.16.0 to 5.16.1 ([e050781](https://github.com/react-auth-kit/react-auth-kit/commit/e050781f309c93e5f076ec939150e579667c1077))

## [1.6.10](https://github.com/react-auth-kit/react-auth-kit/compare/v1.6.9...v1.6.10) (2022-01-15)


### Bug Fixes

* upgrade @testing-library/jest-dom from 5.16.0 to 5.16.1 ([82d11d6](https://github.com/react-auth-kit/react-auth-kit/commit/82d11d6a0893be68782dc33d57cdbfcc691090b9))

## [1.6.9](https://github.com/react-auth-kit/react-auth-kit/compare/v1.6.8...v1.6.9) (2021-12-28)


### Bug Fixes

* upgrade @testing-library/jest-dom from 5.1.0 to 5.16.0 ([8d0756a](https://github.com/react-auth-kit/react-auth-kit/commit/8d0756a847840703bf4f91e7e7eb4007105df452))
* upgrade @testing-library/jest-dom from 5.15.1 to 5.16.0 ([e9953bd](https://github.com/react-auth-kit/react-auth-kit/commit/e9953bd6cbbf4dca3d9cccd519824b455f56b8a3))

## [1.6.8](https://github.com/react-auth-kit/react-auth-kit/compare/v1.6.7...v1.6.8) (2021-12-20)


### Bug Fixes

* upgrade @testing-library/react from 10.0.0 to 10.4.9 ([2a8641d](https://github.com/react-auth-kit/react-auth-kit/commit/2a8641df605883af403db6021bf58d2d20fd099c))

## [1.6.7](https://github.com/react-auth-kit/react-auth-kit/compare/v1.6.6...v1.6.7) (2021-12-18)


### Bug Fixes

* examples/create-react-app/package.json & examples/create-react-app/package-lock.json to reduce vulnerabilities ([e0081ea](https://github.com/react-auth-kit/react-auth-kit/commit/e0081eae63af6724f563e441b3b32ebfd200f4f4))

## [1.6.6](https://github.com/react-auth-kit/react-auth-kit/compare/v1.6.5...v1.6.6) (2021-12-18)


### Bug Fixes

* examples/create-react-app-refresh-token/package.json & examples/create-react-app-refresh-token/package-lock.json to reduce vulnerabilities ([57c87ad](https://github.com/react-auth-kit/react-auth-kit/commit/57c87addd5ece8c6acd5faa77c930922e13bd7e0))

## [1.6.5](https://github.com/react-auth-kit/react-auth-kit/compare/v1.6.4...v1.6.5) (2021-12-15)


### Bug Fixes

* upgrade @testing-library/jest-dom from 5.14.1 to 5.15.1 ([568cf85](https://github.com/react-auth-kit/react-auth-kit/commit/568cf856837cfb71411da69e4303dc177e5edd7f))
* upgrade react-auth-kit from 1.4.18-0 to 1.6.2 ([ffaeb02](https://github.com/react-auth-kit/react-auth-kit/commit/ffaeb024a7084ff71a03bae1d140aa60c8bcb610))

## [1.6.4](https://github.com/react-auth-kit/react-auth-kit/compare/v1.6.3...v1.6.4) (2021-12-07)


### Bug Fixes

* signing param authState is now optional ([4c0dc4e](https://github.com/react-auth-kit/react-auth-kit/commit/4c0dc4e5eeabbbf011194ed0d3a6c34695169046))

## [1.6.3](https://github.com/react-auth-kit/react-auth-kit/compare/v1.6.2...v1.6.3) (2021-12-07)


### Bug Fixes

* **logic:** fixed refresh callback execution waiting ([fbfe38b](https://github.com/react-auth-kit/react-auth-kit/commit/fbfe38b28532589dfdcb090fe2149e3fbefb4ddd))

## [1.6.3-beta.1](https://github.com/react-auth-kit/react-auth-kit/compare/v1.6.2...v1.6.3-beta.1) (2021-12-06)


### Bug Fixes

* **logic:** fixed refresh callback execution waiting ([fbfe38b](https://github.com/react-auth-kit/react-auth-kit/commit/fbfe38b28532589dfdcb090fe2149e3fbefb4ddd))

## [1.6.2](https://github.com/react-auth-kit/react-auth-kit/compare/v1.6.1...v1.6.2) (2021-11-13)


### Bug Fixes

* **package.json:** updated linting package ([fad4305](https://github.com/react-auth-kit/react-auth-kit/commit/fad4305a275b3a1b7da450442b0e9d82ca31164d))

## [1.6.1](https://github.com/react-auth-kit/react-auth-kit/compare/v1.6.0...v1.6.1) (2021-11-09)


### Bug Fixes

* **lockfile:** updated the lockfile version to 2 ([e2f51ff](https://github.com/react-auth-kit/react-auth-kit/commit/e2f51fff847fb0cdc7bb5bf26b1b2a7b184a6729))

# [1.6.0](https://github.com/react-auth-kit/react-auth-kit/compare/v1.5.5...v1.6.0) (2021-10-23)


### Bug Fixes

* old action is deleted ([feada70](https://github.com/react-auth-kit/react-auth-kit/commit/feada705dcde4cb817980ecac3da1f94a1bd21ad))


### Features

* added semantic release plugins ([405a240](https://github.com/react-auth-kit/react-auth-kit/commit/405a2402458d8bb8dc2989e21a56f9385f733be3))
* **package.json:** added @semantic-release/git @semantic-release/changelog ([45302ea](https://github.com/react-auth-kit/react-auth-kit/commit/45302ead09051b55b4dcdd6a5ea67a350c57900d))
* semantic-release ci cd is created ([581dcd7](https://github.com/react-auth-kit/react-auth-kit/commit/581dcd71ffb3dcee405dfadec2000d3b322ee0f2))
