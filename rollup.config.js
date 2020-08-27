import typescript from 'rollup-plugin-typescript2'
import license from 'rollup-plugin-license'
import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'
import pkg from './package.json'

const licenseBanner = license({
    banner: {
        content: '/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.license %> */',
        commentStyle: 'none'
    }
})

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: pkg.main,
                format: 'cjs'
            },
            {
                file: pkg.module,
                format: 'es'
            },
        ],
        external: [
            ...Object.keys(pkg.dependencies || {}),
            ...Object.keys(pkg.peerDependencies || {}),
        ],
        plugin: [
            typescript({tsconfig: "tsconfig.json",}),
            licenseBanner
        ]
    },
    {
        input: 'src/index.ts',
        output: [
            {
                file: pkg.main.replace('.js', '.min.js'),
                format: 'cjs'
            },
            {
                file: pkg.module.replace('.js', '.min.js'),
                format: 'es'
            }
        ],
        external: [
            ...Object.keys(pkg.dependencies || {}),
            ...Object.keys(pkg.peerDependencies || {}),
        ],
        plugin: [
            typescript(),
            terser(),
            licenseBanner,
            filesize()
        ]
    }
]