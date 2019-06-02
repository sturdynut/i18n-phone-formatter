import { terser } from "rollup-plugin-terser";

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
    },
    plugins: [ terser() ]
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.es6.js',
      format: 'esm',
    },
    plugins: [ terser() ]
  },
];
