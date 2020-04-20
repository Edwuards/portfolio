import { Doodle } from './doodle.js';

function Gradients(){
  const EXPOSE = {};
  const GRADIENTS = {};
  const CONTAINER =  $('#gradients');
  const ACTIONS = {};
  const STATE = {
    active: ''
  };
  CONTAINER.width(window.innerWidth);
  CONTAINER.height(window.innerHeight);
  const doodle = new Doodle({container:CONTAINER[0]});
  const CANVAS = doodle.layers.get(0);

  function deviceDimensions(){
    let w = window.innerWidth;
    let h = window.innerHeight;
    let size = '';

    if(w <= 640){ size = 'sm'; }
    else if( w <= 758 ){ size = 'md'; }
    else if( w <= 1024 ){ size = 'lg'; }
    else { size = 'xl'; }

    return {w,h,size}

  }
  function init(){
    for (let name in GRADIENTS) {
      let g = GRADIENTS[name];
      let device = deviceDimensions();
      let radials = { radials:g.sizes()[device.size].radials };
      EXPOSE[name] = doodle.graphics.create.radialgradient.call(null,radials);
      g.colorStops.forEach((c)=>{ EXPOSE[name].colorStops.add.apply(null,c)})
    }
  }

  ACTIONS.resize = ()=>{

    let device = deviceDimensions();
    CANVAS.context.canvas.width = device.w; CANVAS.context.canvas.h = device.h;

    for (let name  in EXPOSE) {
        let gradient = EXPOSE[name];
        let { radials, scale } = GRADIENTS[name].sizes()[device.size];
        gradient.radials.forEach((r,i)=>{
          let center = r.center;
          let radial = radials[i];
          let x = (radial.x - center.x);
          let y = (radial.y - center.y);
          r.radius = radial.r;
          r.translate({x,y,origin:center});
          center = r.center;
          if(STATE.active == name){ r.scale({size: scale.active, origin: center })}
        })
        gradient.space.points.limits.get.x.max.points.forEach((pt)=>{ pt.x = device.w; });
    }

  };

  GRADIENTS['purple-red'] = {
    sizes:()=>{
      let x = window.innerWidth, y = window.innerHeight;
      let device = deviceDimensions();

      return {
        sm:{
          radials: [ { x,y,r:x }, {x,y,r:10} ],
          scale: { active: 2, inactive:.5 }
        },
        md:{
          radials: [ { x:x+200, y:y+200,r:1000 }, {x,y,r:100} ],
          scale: { active: 2, inactive:.5 }
        },
        lg:{
          radials: [ { x:x+200, y:y+200,r:1000 }, {x,y,r:100} ],
          scale: { active: 2, inactive:.5 }
        },
        xl:{
          radials: [ { x,y,r:device.w }, {x:device.w,y:y ,r:device.w/20} ],
          scale: { active: 2, inactive:.5 }
        }
      }

    },
    colorStops: [[0,'#f6e8fd'],[0.9,'#5f70d0a6'],[1,'#d02a86']]
  }

  GRADIENTS['light-brown'] = {
    sizes: ()=>{
      let x = 0, y = 0;
      let device = deviceDimensions();
      return {
        sm:{
          radials: [ { x,y,r: device.w/2 }, {x,y,r: device.w/3} ],
          scale: { active: 5, inactive:.125 }
        },
        md:{
          radials: [ { x,y,r:device.w/3 }, {x,y,r:100} ],
          scale: { active: 5, inactive:.5 }
        },
        lg:{
          radials: [ { x,y,r:device.w/4 }, {x,y,r:100} ],
          scale: { active: 5, inactive:.5 }
        },
        xl:{
          radials: [ { x,y,r:device.w/4 }, {x,y,r:100} ],
          scale: { active: 5, inactive:.5 }
        }
      }

    },
    colorStops: [[0,'#f5deb3b3'],[1,'#ffdc5f94']]
  }
  //
  // GRADIENTS['dark-green'] = {
  //   sizes:{
  //     sm:{
  //       radials: [ { x:x+200, y:y+200,r:1000 }, {x,y,r:100} ],
  //       scale: { active: 2, inactive:.5 }
  //     },
  //     md:{
  //       radials: [ { x:x+200, y:y+200,r:1000 }, {x,y,r:100} ],
  //       scale: { active: 2, inactive:.5 }
  //     },
  //     lg:{
  //       radials: [ { x:x+200, y:y+200,r:1000 }, {x,y,r:100} ],
  //       scale: { active: 2, inactive:.5 }
  //     }
  //   },
  //   colorStops: [[0,'#14442600'],[.9,'#144426ed']]
  // }

  init();

  return { elements: EXPOSE, state: STATE, container: CONTAINER };

}

export { Gradients }
