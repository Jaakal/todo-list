import '../css/todo-card.scss';

const todoCard = (() => {
  const printCard = () => {
    console.log('Card!');
  }

  return {printCard}
})();

export default todoCard;