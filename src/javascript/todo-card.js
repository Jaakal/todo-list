import '../css/todo-card.scss';

const todoCard = () => {
  let project = '';
  let title = '';
  let dueDate = '';
  let description = ''; 
  let priority = '';
  let status ='';
  let index;

  const setCard = (data) => {
    project = data[0];
    title = data[1];
    description = data[2];
    dueDate = data[3];
    priority = data[4];
    status = data[5];
    index = data[6];
  }

  const setCardByLiteral = (data) => {
    project = data.project;
    title = data.title;
    description = data.description;
    dueDate = data.dueDate;
    priority = data.priority;
    status = data.status;
    index = data.index;
  }
  
  const getProject = () => project
  const getTitle = () => title
  const getDueDate = () => dueDate  
  const getDescription = () => description
  const getPriority = () => priority
  const getIndex = () => index;
  const getStatus = () => status;

  const getHTML = () => {
    const htmlString = `
      <tr>
        <td>${project.name}</td>
        <td>${title}</td>
        <td>${description}</td>
        <td>${dueDate}</td>
        <td class="${priority.toLowerCase()}">${priority}</td>
        <td class="${status.toLowerCase()}">${status}</td>
        <td>
          <button class="edit-button" data-index="${index}">Edit</button>
          <button class="delete-button" data-index="${index}">Delete</button>
        </td>
      </tr>
    `;

    return htmlString;
  }

  const getLiteral = () => {
    return {project, title, description, dueDate, priority, status, index};
  }

  return {setCard, setCardByLiteral, getProject, getTitle, getDescription, getDueDate, getPriority, getHTML, getStatus, getIndex, getLiteral}
};

export default todoCard;