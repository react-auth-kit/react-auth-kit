import typescript from 'rollup-plugin-typescript2'
import license from 'rollup-plugin-license'
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import pkg from './package.json'

const licenseBanner = license({
    banner: {
        content: '/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.license %> */',
        commentStyle: 'none'
    }
})

export default {
    input: "src/index.tsx",
    output: [
        {
            file: pkg.main,
            format: "cjs",
            sourcemap: true
        },
        {
            file: pkg.module,
            format: "esm",
            sourcemap: true
        }
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        typescript({ useTsconfigDeclarationDir: true }),
    ]
};
