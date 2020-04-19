export default {
  external:['jquery'],
  input: 'src/js/index.js',
  output:{
    file: 'public/js/index.js',
    name:'index',
    format: 'iife',
    globals:{
      'jquery':'$'
    }
  }
}
