import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';
import license from 'rollup-plugin-license';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const banner = {
  banner: `
        ${pkg.name} - v${pkg.version}
        ${pkg.description}
        ${pkg.homepage}

        Made by ${pkg.author}
        Under ${pkg.license} License
      `
};
const globals = {
  'prop-types': 'PropTypes',
  react: 'React'
};
const external = [...Object.keys(pkg.dependencies), 'react'];

export default [
  {
    input: 'index.js',
    output: {
      name: 'SimpleBar',
      file: pkg.main,
      format: 'umd',
      globals: globals
    },
    external: external,
    plugins: [
      babel({
        exclude: ['/**/node_modules/**']
      }),
      resolve(), // so Rollup can find dependencies
      commonjs(), // so Rollup can convert dependencies to an ES module
      copy({
        targets: [{ src: 'simplebar-react.d.ts', dest: 'dist' }]
      }),
      terser(),
      license(banner)
    ]
  },
  {
    input: 'index.js',
    external: external,
    output: {
      file: pkg.module,
      format: 'es'
    },
    plugins: [
      babel({
        exclude: ['/**/node_modules/**']
      }),
      license(banner)
    ]
  }
];
