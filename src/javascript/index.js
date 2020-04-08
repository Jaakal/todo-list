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

let projects = [];
let activities = [];

let _projectID;
let _activityID;

let currentCard;

const displayCards = (projectID) => {
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

  const filteredActivities = Number(projectID) !== -1 ? activities.filter((activity) => {
    return activity.getProject().index === Number(projectID);
  }) : activities;
  
  for (let i = 0; i < filteredActivities.length; i += 1) {
    $('.todo-table').append(filteredActivities[i].getHTML());
  }

  $('.edit-button').click(editActivity);
  $('.delete-button').click(removeActivity);
}

const addProject = () => {
  $('.add-activity').addClass('hide');
  $('.add-project').removeClass('hide');
}

const submitProject = (event) => {
  event.preventDefault();

  $('.add-project').addClass('hide');

  const project = projectCard($('#add-project').val(), _projectID);

  projects.push(project);
  $('#project-list').append(`<option value=${project.index}>${project.name}</option>`);
  $('#choose-project-list').append(`<option value=${project.index}>${project.name}</option>`);
  
  _projectID += 1;

  updateLocalStorage();
}
const updateLocalStorage = () => {
  const literalArray = activities.map((card) => {
    return card.getLiteral();
  });

  localStorage.setItem("activities", JSON.stringify(literalArray));
  localStorage.setItem("projects", JSON.stringify(projects));
  localStorage.setItem("_projectsID", JSON.stringify(_projectID));
  localStorage.setItem("_activityID", JSON.stringify(_activityID));
}

const addActivity = () => {
  currentCard = todoCard();

  $('.add-project').addClass('hide');
  $('.add-activity').removeClass('hide');
}


const submitActivity = (event) => {
  event.preventDefault();
  $('.add-activity').addClass('hide');

  const activityData = $('.add-activity').serializeArray();
  
  let currentIndex = currentCard.getIndex();
  let displayCardsCurrentProject = $('#choose-project-list').val();

  if (currentIndex === undefined) {
    currentIndex = _activityID;
    activities.push(currentCard);
    displayCardsCurrentProject = activityData[0].value;
    _activityID += 1;
  }

  const filteredProject = projects.filter((project) => {
      return Number(project.index) === Number(activityData[0].value);
  })[0];

  const cardData = [filteredProject, 
                    activityData[1].value, 
                    activityData[2].value, 
                    activityData[3].value, 
                    activityData[4].value.charAt(0).toUpperCase()  + activityData[4].value.slice(1), 
                    currentIndex
                   ];

  currentCard.setCard(cardData);
  updateLocalStorage();
  displayCards(displayCardsCurrentProject);
}

const editActivity = (event) => {
  currentCard = activities.filter((activity) => {
    return activity.getIndex() === $(event.target).data('index');
  })[0];

  // activities.map((element, index) => {
  //   if (element.getIndex() === $(event.target).data('index')) {
  //     activities.splice(index, 1);
  //   }
  // });
  
  // currentCard = activities[$(event.target).data('index')];

  $('#project-list').val(currentCard.getProject().index);
  $('#title').val(currentCard.getTitle());
  $('#description').val(currentCard.getDescription());
  $('#due-date').val(currentCard.getDueDate());
  $('#priority-list').val(currentCard.getPriority().toLowerCase());

  $('.add-activity').removeClass('hide');
}

const removeActivity = (event) => {
  activities.map((element, index) => {
    if (element.getIndex() === $(event.target).data('index')) {
      activities.splice(index, 1);
    }
  });
  
  updateLocalStorage();
  
  displayCards($('#choose-project-list').val());
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

  _activityID = Number(localStorage.getItem("_activityID"));
  _activityID = _activityID || 0;

  let localStorageCards = JSON.parse(localStorage.getItem("activities") || "[]");

  localStorageCards = localStorageCards.map((card) => {
    if (card) {
      let _todoCard = todoCard();
      _todoCard.setCardByLiteral(card);
      return _todoCard;
    }

    return null;
  });

  activities = localStorageCards;

  _projectID = Number(localStorage.getItem("_projectsID"));
  _projectID = _projectID || 1;
  
  projects = JSON.parse(localStorage.getItem("projects") || "[]");

  let tempProjects = {'Other projects': projectCard('Other projects', 0)};
  
  for (let i = 0; i < activities.length; i += 1) {
    tempProjects[activities[i].getProject().name] = activities[i].getProject();
  }

  projects = Object.values(tempProjects);
  
  updateLocalStorage();
  
  
  $('#choose-project-list').append(`<option disabled selected value> -- select an option -- </option>`);
  
  for(let i = 0; i < projects.length; i += 1) {
    $('#choose-project-list').append(`<option value="${projects[i].index}">${projects[i].name}</option>`);
    $('#project-list').append(`<option value="${projects[i].index}">${projects[i].name}</option>`);
  }
  $('#choose-project-list').append(`<option value="${-1}">All the projects</option>`);

  $('#choose-project-list').change(() => {
    displayCards($('#choose-project-list').val());
  });
  
  displayCards(-1);
});

