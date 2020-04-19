import { Doodle } from './doodle.js';

function Gradients(){
  const EXPOSE = {};
  const GRADIENTS = {};
  const Elements = {
    container: $('#gradients')
  }

  Elements.container.width(window.innerWidth);
  Elements.container.height(window.innerHeight);
  const doodle = new Doodle({container:Elements.container[0]});
  // let g = doodle.graphics.create.rectangle({
  //   w: window.innerWidth,
  //   h: window.innerHeight,
  //   x: 0, y:0
  // });
  // g.context.fillStyle = 'white';

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
          scale: { active: 2, inactive:.5 }
        },
        md:{
          radials: [ { x,y,r:device.w/3 }, {x,y,r:100} ],
          scale: { active: 2, inactive:.5 }
        },
        lg:{
          radials: [ { x,y,r:device.w/4 }, {x,y,r:100} ],
          scale: { active: 2, inactive:.5 }
        },
        xl:{
          radials: [ { x,y,r:device.w/4 }, {x,y,r:100} ],
          scale: { active: 2, inactive:.5 }
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


    for (let name in GRADIENTS) {
      let g = GRADIENTS[name];
      let device = deviceDimensions();
      let radials = { radials:g.sizes()[device.size].radials };
      EXPOSE[name] = doodle.graphics.create.radialgradient.call(null,radials);
      console.log(EXPOSE[name]);
      g.colorStops.forEach((c)=>{ EXPOSE[name].colorStops.add.apply(null,c)})
    }

    window.addEventListener('resize',function(){
      let device = deviceDimensions();
      doodle.layers.get().forEach((l)=>{ l.context.canvas.width = device.w; l.context.canvas.h = device.h; })
      for(let name in EXPOSE){
        let g = EXPOSE[name];
        GRADIENTS[name].sizes()[device.size].radials.forEach((obj,i)=>{ g.radials[i].radius = obj.r; })
      }
    })

  return EXPOSE;

}

export { Gradients }
