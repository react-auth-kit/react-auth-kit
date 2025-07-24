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
        ["@babel/preset-env", { targets: { node: 18 } }],
        "@babel/preset-typescript",
      ],
      ignore: [
        "**/__tests__/**",
      ],
      comments: false
    }
  }
