export default {
  input:  'src/index.js',
  output: {
    file: 'index.js',
    format: 'umd',
    name: 'riotHotReload'
  },
  interop: false,
  external: ['riot']
}