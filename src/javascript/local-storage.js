const localStorageHandler = (() => {
  const update = (activities, projects, projectID, activityID) => {
    const literalArray = activities.map((card) => {
      return card.getLiteral();
    });
  
    localStorage.setItem("activities", JSON.stringify(literalArray));
    localStorage.setItem("projects", JSON.stringify(projects));
    localStorage.setItem("_projectsID", JSON.stringify(projectID));
    localStorage.setItem("_activityID", JSON.stringify(activityID));
  }

  const getItem = (item) => {
    return localStorage.getItem(item);
  }

  return {update, getItem};
})();

export default localStorageHandler;