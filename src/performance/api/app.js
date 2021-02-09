require('./performance.css');
const { store$, updateDataAction } = require('./store');
const { getDataAsync } = require('./performance-client');
// const {
//   addTaskAsync,
//   loadTasksAsync,
//   doneTaskAsync,
//   undoneTaskAsync,
// } = require('./todo-client');

const teks1 = document.getElementById("coba1");
const teks2 = document.getElementById("coba2");
const teks3 = document.getElementById("coba3");
// view

store$.subscribe(() => {
  const state = store$.getState();
  render(state);
});

store$.dispatch(getDataAsync)

function render (state) {
  teks1.innerHTML = state.taskComplete
  teks2.innerHTML = state.taskOngoing
  teks3.innerHTML = state.workerSum
}