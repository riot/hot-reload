import buble from 'rollup-plugin-buble'

export default {
  entry: 'src/index.js',
  dest: 'index.js',
  moduleName: 'riotHotReload',
  format: 'umd',
  interop: false,
  external: ['riot'],
  plugins: [buble()]
}