import { Gradients } from './gradients.js';
import { default as Sections } from './sections.js';
import $ from 'jquery';

$(document).ready(function(){
	const gradients = Gradients();
	const sections = Sections();

	sections.home.elements.a.on('mouseenter',sections.home.actions.strike);
	sections.home.elements.a.on('mouseleave',sections.home.actions.unstrike);
	sections.home.elements.a.on('click',sections.home.actions.activate);

});
