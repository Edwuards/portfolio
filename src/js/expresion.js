import { Doodle } from './doodle.js';
import $ from 'jquery';
const Gradients = [];

$(document).ready(function(){
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
			{
				x: 0, y:0,
				w: window.innerWidth,
				h: window.innerHeight,
				radials: (()=>{
					let x = window.innerWidth, y = window.innerHeight;
					return [{x:x+200,y:y+200,r:1000},{x,y,r:100}]
				})()
			},
			[[0,'#f6e8fd'],[0.9,'#c29ad6'],[1,'#d02a86']]
		],
		[
			{
				x: 0, y:0,
				w: window.innerWidth,
				h: window.innerHeight,
				radials: (()=>{
					let x = 0, y = 100;
					return [{x,y,r:400},{x,y,r:20}];
				})()
			},
			[[0,'#f5deb3b3'],[1,'#ffdc5f94']]
		],
	].forEach((args)=>{
		let g = doodle.graphics.create.radialgradient.call(null,args[0]);
		args[1].forEach((data)=>{ g.colorStops.add.apply(null,data)} );
		Gradients.push(g);
	});

	$('a').on('mouseenter',function(){
		let a = $(this), line = a.find('.line');
		line.addClass('active');
		a.on('click',function(e){
			e.preventDefault();
			$('.line').removeClass('active');
			line.addClass('active');
			a.off('mouseleave');
		})
		a.on('mouseleave',function(){
			line.removeClass('active')
			a.off('mouseleave click');
		})
	});



});

export { Gradients }
