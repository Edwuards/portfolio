import { default as Vistas } from './vistas.js';
import { default as GradientesInit } from './gradientes.js';

export default function(){
  const VistasInit =  Vistas();
  const { Secciones } = VistasInit;
  const Acciones = {};
  const Elementos = {}
  const Gradientes = GradientesInit();

  Acciones.transición = (gradiente)=>{
    if(gradiente != Gradientes.estado.activo){
      let activo = Gradientes.estado.activo;
      if(activo == ''){ Gradientes.acciones.activar(gradiente); }
      else{
        Gradientes.acciones.desactivar(activo).then(()=>{
          Gradientes.acciones.activar(gradiente);
        });
      }
    }

  }
  Acciones.mostrar = {};
  Acciones.mostrar.sección = (elemento)=>{
    let secciones = {
      'sobreMí':'café-claro',
      'proyectos':'rojo-morado'
    };
    Acciones.transición(secciones[elemento.attr('href')]);

  }
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
