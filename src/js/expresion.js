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

	let x = window.innerWidth, y = window.innerHeight;
	g.context.createRadialGradient(x+200,y+200,1000,x,y,100);
	g.context.addColorStop(0,'white');

	g.context.addColorStop(0.5,'#b5ff10');
	g.context.addColorStop(1,'yellow');

});
