import '../css/todo-card.scss';

const todoCard = () => {
  let project = '';
  let title = '';
  let dueDate = '';
  let description = ''; 
  let priority = '';
  let index;

  const setCard = (data) => {
    project = data[0];
    title = data[1];
    description = data[2];
    dueDate = data[3];
    priority = data[4];
    index = data[5];
  }
  
  const getProject = () => project
  const getTitle = () => title
  const getDueDate = () => dueDate  
  const getDescription = () => description
  const getPriority = () => priority
  
  const getHTML = () => {
    const htmlString = `
      <tr>
        <td>${project.name}</td>
        <td>${title}</td>
        <td>${description}</td>
        <td>${dueDate}</td>
        <td>${priority}</td>
        <td>
          <button class="edit-button" data-index="${index}">Edit</button>
          <button class="delete-button" data-index="${index}">Delete</button>
        </td>
      </tr>
    `;

    return htmlString;
  }

  return {setCard, getProject, getTitle, getDescription, getDueDate, getPriority, getHTML}
};

export default todoCard;