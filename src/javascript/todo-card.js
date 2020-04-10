import '../css/todo-card.scss';

const todoCard = () => {
  let project = '';
  let title = '';
  let dueDate = '';
  let description = '';
  let priority = '';
  let status = '';
  let index;

  const setCard = (data) => {
    [project, title, description, dueDate, priority, status, index] = data;
  };

  const setCardByLiteral = (data) => {
    ({
      project, title, description, dueDate, priority, status, index,
    } = data);
  };

  const getProject = () => project;
  const getTitle = () => title;
  const getDueDate = () => dueDate;
  const getDescription = () => description;
  const getPriority = () => priority;
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
  };

  const getLiteral = () => ({
    project, title, description, dueDate, priority, status, index,
  });

  return {
    setCard,
    setCardByLiteral,
    getProject,
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
    getHTML,
    getStatus,
    getIndex,
    getLiteral,
  };
};

export default todoCard;