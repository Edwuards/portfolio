export default {
  external:['jquery'],
  input: 'src/js/índice.js',
  output:{
    file: 'public/js/índice.js',
    name:'index',
    format: 'iife',
    globals:{
      'jquery':'$'
    }
  }
}
