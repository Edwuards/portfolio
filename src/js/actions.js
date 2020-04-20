import { Sections } from './sections.js';
import { Gradients } from './gradients.js';

const GRADIENTS = Gradients();
const { HOME } = Sections();
const ACTIONS = {};

ACTIONS.show = {};
ACTIONS.strikeElement = function(){
  let element = $(this);
  HOME.actions.strike();

  element.on('mouseleave',()=>{
    element.off('mouseleave');
    HOME.actions.unstrike();
  });
}
ACTIONS.activateSection = function(){
  let element = $(this);
  if(element) =
  HOME.actions.activate();
  gradients.state.active = 'light-brown';
  let g = gradients.elements['light-brown'];
  g.actions.scale({size:5,origin:()=>{ return g.center }},1000)
});
}
