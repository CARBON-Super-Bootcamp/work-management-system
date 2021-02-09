const { dispatch } = require('rxjs/internal/observable/pairs');
const { fetchTasksApi } = require('./performance-service');
const {
  updateDataAction,
} = require('./store');

const getDataAsync = async (dispatch, getState) => {
  const taskData = await fetchTasksApi();
  console.log(taskData);
  dispatch(updateDataAction(taskData));
};

module.exports = {
  getDataAsync,
};
