export default {
  external:['jquery'],
  input: 'src/js/expresion.js',
  output:{
    file: 'public/js/index.js',
    name:'index',
    format: 'iife',
    globals:{
      'jquery':'$'
    }
  }
}
