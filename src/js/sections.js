function Home(){
  const ACTIONS = {};
  const ELEMENTS = {
    a: $('#nombre a, nav a')
  };
  const STATE = {
    active: undefined
  }

  ELEMENTS.a.each(function(){ ELEMENTS[$(this).attr('href')] = $(this); });

  ACTIONS.strike = function(){
    let a = $(this);
    a.addClass('strike');
  }
  ACTIONS.unstrike = function(){
    let a = $(this);
    if(!a.hasClass('active')){ a.removeClass('strike'); }
  }
  ACTIONS.activate = function(e){
    e.preventDefault();
    let a = $(this);
    if(!a.hasClass('active')){
      ELEMENTS.a.removeClass('active strike');
      a.addClass('active strike');
      STATE.active = a.attr('href');
    }
  }

  return {
    elements: ELEMENTS,
    actions: ACTIONS
  }

}




export default function(){ return {home:Home()} };
