import '../css/reset.css';
import '../css/style.scss';
import '../css/index.scss';

/**
 * JavaScript module requirers have to be below the stylesheet imports.
 * Otherwise stylesheets which will come with other modules
 * will be added before the main stylesheets. 
 * **/ 

import $ from 'jquery';
import todoHandler from './todo-handler';

$(document).ready(() => {
  todoHandler.start();
});

