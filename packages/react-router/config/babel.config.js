// @ts-check
// We aim to have the same support as Next.js
// https://nextjs.org/docs/getting-started#system-requirements
// https://nextjs.org/docs/basic-features/supported-browsers-features

/** @type {import("@babel/core").ConfigFunction} */
module.exports = (api) => {
    const isTest = api.env("test")
    if (isTest) {
      return {
        presets: [
          "@babel/preset-env",
          ["@babel/preset-react", { runtime: "automatic" }],
          ["@babel/preset-typescript", { isTSX: true, allExtensions: true }],
        ],
      }
    }
    return {
      presets: [
        ["@babel/preset-env", { targets: { node: 12 } }],
        "@babel/preset-typescript",
      ],
      plugins: [
        "@babel/plugin-transform-optional-catch-binding",
        "@babel/plugin-transform-runtime",
      ],
      ignore: [
        "../src/**/__tests__/**",
      ],
      comments: false,
      overrides: [
        {
          test: [
            '../src/index.ts',
            '../src/RequireAuth.tsx',
            '../src/AuthOutlet.tsx'

          ],
          presets: [
            ["@babel/preset-env", { targets: { ie: 11 } }],
            ["@babel/preset-react", { runtime: "automatic" }],
          ],
        }
      ]
    }
  }