import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';
import react from 'react';
import reactDom from 'react-dom';
import { babel } from '@rollup/plugin-babel';
import reactIs from 'react-is';
import packageJson from './package.json';
export default {
  input: 'src/index.ts',

  output: [
    {
      // This is an easy way to keep your `main` in sync between rollup & the package
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    postcss({
      modules: true,
      extract: true,
      minimize: true,
      sourceMap: true
    }),
    url(),
    svgr(),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
      exclude: ['src/**/*.stories.tsx', 'src/**/*.test.(tsx|ts)']
    }),

    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'react': Object.keys(react),
        'react-dom': Object.keys(reactDom),
        'react-is': Object.keys(reactIs)
      }
    }),
    babel({ babelHelpers: 'bundled' }),
  ]
};
