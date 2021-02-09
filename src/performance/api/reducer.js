// setup state
const initialState = {
  taskComplete : 0,
  taskOngoing : 0,
  workerSum : 0,
  // taskCancel : 0
};

function updateData (state, action) {
  state.taskComplete = action.payload.data.task.complete
  state.taskOngoing = action.payload.data.task.total - action.payload.data.task.complete
  state.workerSum = action.payload.data.worker.total
  // state.taskcancel = action.payload.cancel
  return state;
}

module.exports = {
  initialState,
  updateData,
};
