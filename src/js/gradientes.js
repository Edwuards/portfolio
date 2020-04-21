import { Doodle } from './doodle.js';

export default function(){
  const Elementos = {};
  const Gradientes = {};
  const Contenedor =  $('#gradients');
  const Acciones = {};
  const Estado = {
    activo: ''
  };
  Contenedor.width(window.innerWidth);
  Contenedor.height(window.innerHeight);
  const doodle = new Doodle({container:Contenedor[0]});
  const CANVAS = doodle.layers.get(0);

  function dimensionesDePantalla(){
    let w = window.innerWidth;
    let h = window.innerHeight;
    let size = '';

    if(w <= 640){ size = 'sm'; }
    else if( w <= 758 ){ size = 'md'; }
    else if( w <= 1024 ){ size = 'lg'; }
    else { size = 'xl'; }

    return {w,h,size}

  }
  function iniciar(){
    for (let name in Gradientes) {
      let g = Gradientes[name];
      let pantalla = dimensionesDePantalla();
      let radials = { radials:g.tamaños()[pantalla.size].radials };
      Elementos[name] = doodle.graphics.create.radialgradient.call(null,radials);
      g.colorStops.forEach((c)=>{ Elementos[name].colorStops.add.apply(null,c)})
    }
  }


  Gradientes['rojo-morado'] = {
    tamaños:()=>{
      let x = window.innerWidth, y = window.innerHeight;
      let pantalla = dimensionesDePantalla();

      return {
        sm:{
          radials: [ { x,y,r:x }, {x,y,r:10} ],
          scale: { activar: 2, desactivar:.5 }
        },
        md:{
          radials: [ { x:x+200, y:y+200,r:1000 }, {x,y,r:100} ],
          scale: { activar: 2, desactivar:.5 }
        },
        lg:{
          radials: [ { x:x+200, y:y+200,r:1000 }, {x,y,r:100} ],
          scale: { activar: 2, desactivar:.5 }
        },
        xl:{
          radials: [ { x,y,r:pantalla.w }, {x:pantalla.w,y:y ,r:pantalla.w/20} ],
          scale: { activar: 2, desactivar:.5 }
        }
      }

    },
    colorStops: [[0,'#f6e8fd'],[0.9,'#5f70d0a6'],[1,'#d02a86']]
  }

  Gradientes['café-claro'] = {
    tamaños: ()=>{
      let x = 0, y = 0;
      let pantalla = dimensionesDePantalla();
      return {
        sm:{
          radials: [ { x,y,r: pantalla.w/2 }, {x,y,r: pantalla.w/3} ],
          scale: { activar: 5, desactivar:.125 }
        },
        md:{
          radials: [ { x,y,r:pantalla.w/3 }, {x,y,r:100} ],
          scale: { activar: 5, desactivar:.5 }
        },
        lg:{
          radials: [ { x,y,r:pantalla.w/4 }, {x,y,r:100} ],
          scale: { activar: 5, desactivar:.5 }
        },
        xl:{
          radials: [ { x,y,r:pantalla.w/4 }, {x,y,r:100} ],
          scale: { activar: 5, desactivar:.5 }
        }
      }

    },
    colorStops: [[0,'#f5deb3b3'],[1,'#ffdc5f94']]
  }

  Acciones.resize = ()=>{

    let pantalla = dimensionesDePantalla();
    CANVAS.context.canvas.width = pantalla.w; CANVAS.context.canvas.h = pantalla.h;

    for (let name  in Elementos) {
        let gradient = Elementos[name];
        let { radials, scale } = Gradientes[name].tamaños()[pantalla.size];
        gradient.radials.forEach((r,i)=>{
          let center = r.center;
          let radial = radials[i];
          let x = (radial.x - center.x);
          let y = (radial.y - center.y);
          r.radius = radial.r;
          r.translate({x,y,origin:center});
          center = r.center;
          if(Estado.activo == name){ r.scale({size: scale.activar, origin: center })}
        })
        gradient.space.points.limits.get.x.max.points.forEach((pt)=>{ pt.x = pantalla.w; });
    }

  };
  Acciones.activar = (gradiente)=>{
    if(Gradientes[gradiente]){
      let pantalla = dimensionesDePantalla();
      let {scale, radials} = Gradientes[gradiente].tamaños()[pantalla.size];
      Estado.activo = gradiente;
      gradiente = Elementos[gradiente];
      return gradiente.actions.scale({
        size: scale.activar ,
        origin: ()=>{ return gradiente.center; }
      },1000);
    }
  }

  iniciar();

  return {
    elementos: Elementos,
    estado: Estado,
    contenedor: Contenedor,
    acciones: Acciones
   };

}
