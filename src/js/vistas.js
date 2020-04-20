


function Secciones(){
  const Acciones = {};
  const Elementos = {
    a: $('#nombre a, nav a')
  };
  const Estado = {
    activo: undefined
  }

  Elementos.a.each(function(){ Elementos[$(this).attr('href')] = $(this); });

  Acciones.marcar = (elemento)=>{ elemento.addClass('marcar'); }
  Acciones.desmarcar = (elemento)=>{ if(!elemento.hasClass('activo')){ elemento.removeClass('marcar'); } }
  Acciones.activar = (elemento)=>{
    if(!elemento.hasClass('activo')){
      Elementos.a.removeClass('activo marcar');
      elemento.addClass('activo marcar');
      Estado.activo = elemento.attr('href');
    }
  }

  return {
    elementos: Elementos,
    acciones: Acciones
  }

}




export default ()=>{ return { Secciones: Secciones() } };
