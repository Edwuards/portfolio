import { default as Vistas } from './vistas.js';
import { default as GradientesInit } from './gradientes.js';

export default function(){
  const VistasInit =  Vistas();
  const { Secciones } = VistasInit;
  const Acciones = {};
  const Elementos = {}
  const Gradientes = GradientesInit();

  Acciones.show = {};
  Acciones.marcarElemento = function(){
    let elemento = $(this);
    Secciones.acciones.marcar(elemento);

    elemento.on('mouseleave',()=>{
      elemento.off('mouseleave');
      Secciones.acciones.desmarcar(elemento);
    });
  };
  Acciones.activarSección = function(e){
    e.preventDefault();
    let elemento = $(this);
    Secciones.acciones.activar(elemento);
    // Gradientes.estado.activo = 'café-claro';
    // let g = Gradientes.elementos['café-claro'];
    // g.acciones.scale({size:5,origin:()=>{ return g.center }},1000)
  };

  for (let nombre in VistasInit) { Elementos[nombre.toLocaleLowerCase()] = VistasInit[nombre].elementos; }

  return {Acciones,Elementos}

}
