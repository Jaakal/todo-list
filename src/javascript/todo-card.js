import '../css/todo-card.scss';

const todoCard = (project, title, dueDate, description,  priority, index) => {
  const htmlString = `
    <tr>
      <td>${project.name}</td>
      <td>${title}</td>
      <td>${description}</td>
      <td>${dueDate}</td>
      <td>${priority}</td>
      <td>
        <button id="edit-${index}" class="edit-button" data-index="${index}">Edit</button>
        <button id="delete-${index}" class="delete-button" data-index="${index}">Delete</button>
      </td>
    </tr>
  `;
  const getIndex = () => index;

  const getHTML = () => {
    return htmlString;
  }

  return {getHTML, getIndex}
};

export default todoCard;