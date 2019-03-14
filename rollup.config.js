import { terser } from "rollup-plugin-terser";


export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'i18nPhoneFormatter'
  },
  plugins: [ terser() ]
};
