import buble from 'rollup-plugin-buble'

export default {
  entry: 'lib/index.js',
  dest: 'index.js',
  moduleName: 'riotHotReload',
  format: 'umd',
  interop: false,
  external: ['riot'],
  plugins: [buble()]
}