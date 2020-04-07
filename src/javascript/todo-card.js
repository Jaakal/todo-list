import '../css/todo-card.scss';

const todoCard = (project, title, description, dueDate, priority) => {
  const htmlString = `
    <tr>
      <td>${project}</td>
      <td>${title}</td>
      <td>${description}</td>
      <td>${dueDate}</td>
      <td>${priority}</td>
    </tr>
  `;

  const getHTML = () => {
    return htmlString;
  }

  return {getHTML}
};

export default todoCard;