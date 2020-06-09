(function ($$1) {
  'use strict';

  $$1 = $$1 && Object.prototype.hasOwnProperty.call($$1, 'default') ? $$1['default'] : $$1;

  function Secciones(){
    const Acciones = {};
    const Elementos = {
      a: $('#nombre a, nav a')
    };
    const Estado = {
      activo: undefined
    };

    Elementos.a.each(function(){ Elementos[$(this).attr('href')] = $(this); });

    Acciones.marcar = (elemento)=>{ elemento.addClass('marcar'); };
    Acciones.desmarcar = (elemento)=>{ if(!elemento.hasClass('activo')){ elemento.removeClass('marcar'); } };
    Acciones.activar = (elemento)=>{
      if(!elemento.hasClass('activo')){
        Elementos.a.removeClass('activo marcar');
        elemento.addClass('activo marcar');
        Estado.activo = elemento.attr('href');
      }
    };

    return {
      elementos: Elementos,
      acciones: Acciones
    }

  }




  var Vistas = ()=>{ return { Secciones: Secciones() } };

  function Init(){
    const VistasInit =  Vistas();
    const { Secciones } = VistasInit;
    const Acciones = {};
    const Elementos = {};

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
      Acciones.mostrar.sección(elemento);
    };

    for (let nombre in VistasInit) { Elementos[nombre.toLocaleLowerCase()] = VistasInit[nombre].elementos; }

    return {Acciones,Elementos}

  }

  function Eventos(){
    const {Acciones,Elementos} = Init();
    Elementos.secciones.a.on('mouseenter',Acciones.marcarElemento);
    // Elementos.secciones.a.on('click',Acciones.activar.sección);
  }

  $$1(document).ready(Eventos);

}($));
