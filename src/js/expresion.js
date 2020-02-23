import { Doodle } from './doodle.js';

window.addEventListener('DOMContentLoaded',function(){
	let container = document.createElement('div');
	container.style.height = window.innerHeight+'px';
	container.style.width = window.innerWidth+'px';
	document.querySelector('body').append(container);

	let doodle = new Doodle({container});
	let g = doodle.graphics.create.rectangle({
		w: window.innerWidth,
		h: window.innerHeight,
		x: 0, y:0
	});

	[
		[
			{ w: window.innerWidth, h: window.innerHeight, x: 0, y:0 },
			(()=>{
				let x = window.innerWidth, y = window.innerHeight;
					return { createRadialGradient: [x+200,y+200,1000,x,y,100],
						addColorStop: [[0,'#f6e8fd'],[0.9,'#c29ad6'],[1,'#d02a86']]
					}
			})()
		],
		[
			{ w: window.innerWidth, h: window.innerHeight, x: 0, y:0 },
			(()=>{
				let x = 0, y = 100;
					return { createRadialGradient: [x,y,400,x,y,20],
						addColorStop: [[0,'#f5deb3b3'],[1,'#ffdc5f94']]
					}
			})()
		],

	].forEach((args)=>{
		let g = doodle.graphics.create.rectangle.call(null,args[0]);
		g.context.createRadialGradient.apply(null,args[1].createRadialGradient);
		args[1].addColorStop.forEach((color)=>{ g.context.addColorStop.apply(null,color); })
	});





});
