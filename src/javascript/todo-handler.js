import $ from 'jquery';
import localStorageHandler from './local-storage';
import projectCard from './project';
import todoCard from './todo-card';

const todoHandler = (() => {

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
      <th>Status</th>
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

  const editActivity = () => {
    currentCard = activities.filter((activity) => {
      return activity.getIndex() === $(event.target).data('index');
    })[0];
  
    $('#project-list').val(currentCard.getProject().index);
    $('#title').val(currentCard.getTitle());
    $('#description').val(currentCard.getDescription());
    $('#due-date').val(currentCard.getDueDate());
    $('#priority-list').val(currentCard.getPriority().toLowerCase());
    $('#status-list').val(currentCard.getStatus());
    $('.add-activity').removeClass('hide');
  }

  const removeActivity = () => {
    activities.map((element, index) => {
      if (element.getIndex() === $(event.target).data('index')) {
        activities.splice(index, 1);
      }
    });
    
    localStorageHandler.update(activities, projects, _projectID, _activityID);
    
    displayCards($('#choose-project-list').val());
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
  
    localStorageHandler.update(activities, projects, _projectID, _activityID);
  }

  const addActivity = () => {
    currentCard = todoCard();

    $('.add-project').addClass('hide');
    $('.add-activity').removeClass('hide');
  }

  const submitActivity = () => {
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
                      activityData[5].value,
                      currentIndex
                     ];
  
    currentCard.setCard(cardData);
    localStorageHandler.update(activities, projects, _projectID, _activityID);
    displayCards(displayCardsCurrentProject, activities);
  }

  const start = () => {
    $('.add-project-button').click(addProject);
    $('.add-activity-button').click(addActivity);
    
    $('.add-project').submit(submitProject);
    $('.add-activity').submit(submitActivity);

    const date = new Date();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    const day = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : `${date.getUTCDate()}`;
    
    $('#due-date').attr("value", `${date.getFullYear()}-${month}-${day}`);

    _activityID = Number(localStorageHandler.getItem("_activityID"));
    _activityID = _activityID || 0;

    let localStorageCards = JSON.parse(localStorageHandler.getItem("activities") || "[]");

    localStorageCards = localStorageCards.map((card) => {
      let _todoCard = todoCard();
      _todoCard.setCardByLiteral(card);
      return _todoCard;
    });

    activities = localStorageCards;

    _projectID = Number(localStorageHandler.getItem("_projectsID"));
    _projectID = _projectID || 1;
    
    projects = JSON.parse(localStorageHandler.getItem("projects") || "[]");

    let tempProjects = {'Other projects': projectCard('Other projects', 0)};
    
    for (let i = 0; i < activities.length; i += 1) {
      tempProjects[activities[i].getProject().name] = activities[i].getProject();
    }

    projects = Object.values(tempProjects);
    
    localStorageHandler.update(activities, projects, _projectID, _activityID);

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
  }

  return {displayCards, start};
})();

export default todoHandler;