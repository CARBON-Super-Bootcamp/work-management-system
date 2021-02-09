// setup state
const initialState = [
  // { id: 1, task: 'main', done: false },
  // { id: 2, task: 'minum', done: true },
  {id: 1, name: 'makan', isCompleted: false, isDeleted: false},
  {id: 2, name: 'minum', isCompleted: false, isDeleted: false}
];

// reduce function
function add(state, action) {
  state.push({ id: action.payload.id, task: action.payload.task, done: false });
  return state;
}

function loadTasks(state, action) {
  state = action.payload;
  return state;
}

module.exports = {
  initialState,
  add,
  loadTasks,
};
