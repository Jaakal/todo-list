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
import Project from './project';

const projects = [];
const activities = [];

const wrapperCards = () => {
  $('.todo-table').html(`
  <tr>
    <th>Project</th>
    <th>Title</th>
    <th>Due Date</th>
    <th>Description</th>
    <th>Priority</th>
    <th>Edit</th>
  </tr>
`)

  for(let i = 0; i < activities.length; i += 1) {
    const card = activities[i];
    if (card) {
      $('.todo-table').append(card.getHTML());
      $(`#delete-${card.getIndex()}`).click(removeActivity);
      $(`#edit-${card.getIndex()}`).click(editActivity);
    }
  }
}

const addProject = (event) => {
  $('.add-activity').addClass('hide');
  $('.add-project').removeClass('hide');
}

const addActivity = () => {
  $('.add-project').addClass('hide');
  $('.add-activity').removeClass('hide');
}

const submitProject = (event) => {
  event.preventDefault();
  const project = Project($('#add-project').val(), projects.length);
  projects.push(project);
  $('#project-list').append(`<option value=${project.index}>${project.name}</option>`)
}

const removeActivity = (event) => {
  const card = activities[$(event.target).data('index')];
  activities[card.getIndex()] = null
  wrapperCards();
}

const editActivity = (event) => {
  const card = activities[$(event.target).data('index')];
}

const submitActivity = (event) => {
  event.preventDefault();
  const activityData = $('.add-activity').serializeArray();
  const card = todoCard(projects[activityData[0].value], 
                        activityData[1].value, 
                        activityData[2].value, 
                        activityData[3].value, 
                        activityData[4].value, 
                        activities.length);

  $('.todo-table').append(card.getHTML());
  $(`#edit-${card.getIndex()}`).click(editActivity);
  $(`#delete-${card.getIndex()}`).click(removeActivity);
  activities.push(card);
}

$(document).ready(() => {
  $('.add-project-button').click(addProject);
  $('.add-activity-button').click(addActivity);
  $('.add-project').submit(submitProject);
  $('.add-activity').submit(submitActivity);
  const card = todoCard(
    Project('test'),
    'Everyday Chores changes',
    'Making your bed.',
    '07.04.2020',
    'Every morning first thing!',
    'High');

  $('.todo-table').append(card.getHTML());
});

