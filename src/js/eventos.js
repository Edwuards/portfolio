import { default as Init } from './acciones.js';

function Eventos(){
  const {Acciones,Elementos} = Init();
  Elementos.secciones.a.on('mouseenter',Acciones.marcarElemento);
  Elementos.secciones.a.on('click',Acciones.activarSección);
}


export { Eventos }
