import typescript from 'rollup-plugin-typescript2'
import license from 'rollup-plugin-license'
import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import pkg from './package.json'

const licenseBanner = license({
    banner: {
        content: '/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.license %> */',
        commentStyle: 'none'
    }
})

export default [
    {
        input: "src/index.tsx",
        output: [
            {
                file: pkg.main,
                format: "cjs",
            },
            {
                file: pkg.module,
                format: "esm",
            }
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            typescript({ useTsconfigDeclarationDir: true }),
        ]
    },
    {
        input: "src/index.tsx",
        output: [
            {
                file: pkg.main.replace('.js', '.umd.js'),
                format: 'umd',
                name: 'ReactAuthKit'
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            typescript({ useTsconfigDeclarationDir: true }),
            terser(),
            licenseBanner,
            filesize()
        ]
    }
];
