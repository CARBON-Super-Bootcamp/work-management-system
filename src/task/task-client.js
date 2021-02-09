const {
  fetchTasksApi,
  addTaskApi,
} = require('./api/task-service');
const {
  addAction,
  loadTasksAction,
} = require('./store');

const addTaskAsync = (task) => async (dispatch, getState) => {
  const taskData = await addTaskApi(task);
  dispatch(addAction(taskData));
};

const loadTasksAsync = async (dispatch, getState) => {
  const tasksAsync = await fetchTasksApi();
  console.log(tasksAsync);
  dispatch(loadTasksAction(tasksAsync));
};


module.exports = {
  addTaskAsync,
  loadTasksAsync,
};
