import { default as Vistas } from './vistas.js';

export default function(){
  const VistasInit =  Vistas();
  const { Secciones } = VistasInit;
  const Acciones = {};
  const Elementos = {}

  Acciones.mostrar = {};
  Acciones.marcarElemento = function(){
    let elemento = $(this);
    Secciones.acciones.marcar(elemento);

    elemento.on('mouseleave',()=>{
      elemento.off('mouseleave');
      Secciones.acciones.desmarcar(elemento);
    });
  };
  Acciones.activar = {};
  Acciones.activar.sección = function(e){
    e.preventDefault();
    let elemento = $(this);
    Secciones.acciones.activar(elemento);
    Acciones.mostrar.sección(elemento)
  };

  for (let nombre in VistasInit) { Elementos[nombre.toLocaleLowerCase()] = VistasInit[nombre].elementos; }

  return {Acciones,Elementos}

}
