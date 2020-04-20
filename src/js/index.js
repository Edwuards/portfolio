import { Gradients } from './gradients.js';
import { default as Sections } from './sections.js';
import $ from 'jquery';

let expose = {};
$(document).ready(function(){
	const gradients = Gradients();
	const sections = Sections();
	console.log(gradients);
	expose.gradients = gradients;

	sections.home.elements.a.on('mouseenter',sections.home.actions.strike);
	sections.home.elements.a.on('mouseleave',sections.home.actions.unstrike);
	sections.home.elements.a.on('click',sections.home.actions.activate);
	sections.home.elements.about.on('click',()=>{
		gradients.state.active = 'light-brown';
		let g = gradients.elements['light-brown'];
		g.actions.scale({size:5,origin:()=>{ return g.center }},1000)
	});

});
