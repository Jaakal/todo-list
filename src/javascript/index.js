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
import projectCard from './project';

const projects = [];
let activities = [];

let currentCard;

const displayCards = () => {
  $('.todo-table').html(`
    <tr>
      <th>Project</th>
      <th>Title</th>
      <th>Description</th>
      <th>Due Date</th>
      <th>Priority</th>
      <th>Edit</th>
    </tr>
  `);

  for(let i = 0; i < activities.length; i += 1) {
    const card = activities[i];
    if (card) {
      $('.todo-table').append(card.getHTML());
    }
  }

  $('.edit-button').click(editActivity);
  $('.delete-button').click(removeActivity);
}

const addProject = (event) => {
  $('.add-activity').addClass('hide');
  $('.add-project').removeClass('hide');
}

const submitProject = (event) => {
  event.preventDefault();

  $('.add-project').addClass('hide');

  const project = projectCard($('#add-project').val(), projects.length);
  
  projects.push(project);
  $('#project-list').append(`<option value=${project.index}>${project.name}</option>`);
}

const addActivity = () => {
  currentCard = todoCard();

  $('.add-project').addClass('hide');
  $('.add-activity').removeClass('hide');
}

const updateLocalStorage = () => {
  const literalArray = activities.map((card) => {
    if(card) {
      return card = card.getLiteral();
    }
    return null;
  });
  localStorage.setItem("activities", JSON.stringify(literalArray));
}

const submitActivity = (event) => {
  event.preventDefault();
  $('.add-activity').addClass('hide');

  const activityData = $('.add-activity').serializeArray();
  let currentIndex = currentCard.getIndex();
  if (currentIndex === undefined) {
    currentIndex = activities.length;
    activities.push(currentCard);
  }

  const cardData = [projects[activityData[0].value], 
                    activityData[1].value, 
                    activityData[2].value, 
                    activityData[3].value, 
                    activityData[4].value.charAt(0).toUpperCase()  + activityData[4].value.slice(1), 
                    currentIndex
                   ];


  currentCard.setCard(cardData);
  updateLocalStorage();
  displayCards();
}

const editActivity = (event) => {
  currentCard = activities[$(event.target).data('index')];

  $('#project-list').val(currentCard.getProject().index);
  $('#title').val(currentCard.getTitle());
  $('#description').val(currentCard.getDescription());
  $('#due-date').val(currentCard.getDueDate());
  $('#priority-list').val(currentCard.getPriority().toLowerCase());

  $('.add-activity').removeClass('hide');
}

const removeActivity = (event) => {
  const card = activities[$(event.target).data('index')];
  activities[card.getIndex()] = null;
  updateLocalStorage();
  displayCards();
}


$(document).ready(() => {
  $('.add-project-button').click(addProject);
  $('.add-activity-button').click(addActivity);
  
  $('.add-project').submit(submitProject);
  $('.add-activity').submit(submitActivity);

  const date = new Date();
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
  const day = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : `${date.getUTCDate()}`;
  
  $('#due-date').attr("value", `${date.getFullYear()}-${month}-${day}`);

  let project = projectCard('Other projects', 0);
  projects.push(project);
  $('#project-list').append(`<option value=${project.index}>${project.name}</option>`);

  project = projectCard('Programming', 1);
  projects.push(project);
  $('#project-list').append(`<option value=${project.index}>${project.name}</option>`);
  
  project = projectCard('Cooking', 2);
  projects.push(project);
  $('#project-list').append(`<option value=${project.index}>${project.name}</option>`);
  
  project = projectCard('Dancing', 3);
  projects.push(project);
  $('#project-list').append(`<option value=${project.index}>${project.name}</option>`);

  let todo = todoCard();

  let cardData = [
    projects[1],
    'Everyday Chores changes',
    'Making your bed.',
    '2020-04-07',
    'High',
    activities.length
  ];

  let localStorageCards = JSON.parse(localStorage.getItem("activities") || "[]");
  localStorageCards = localStorageCards.map((card) => {
    if(card){
      let _todoCard = todoCard();
      _todoCard.setCardByLiteral(card);
      return card = _todoCard;
    }
    return null;
  })
  activities = localStorageCards;
  //todo.setCard(cardData);
  //activities.push(todo);
  //console.log(activities);
  displayCards();
  // $('.todo-table').append(card.getHTML());
});

