import '../css/reset.css';
import '../css/style.scss';
import '../css/index.scss';

/**
 * JavaScript module requirers have to be below the stylesheet imports.
 * Otherwise stylesheets which will come with other modules
 * will be added before the main stylesheets. 
 * **/ 

import $ from 'jquery';

import todoCard from './todo-card';

const addProject = () => {
  $('.add-activity').addClass('hide');
  $('.add-project').removeClass('hide');
}

const addActivity = () => {
  $('.add-project').addClass('hide');
  $('.add-activity').removeClass('hide');
}

$(document).ready(() => {
  $('.add-project-button').click(addProject);
  $('.add-activity-button').click(addActivity);
  
  const card = todoCard(
    'Everyday Chores changes',
    'Making your bed.',
    '07.04.2020',
    'Every morning first thing!',
    'High');
  
  $('.todo-table').append(card.getHTML());
});

