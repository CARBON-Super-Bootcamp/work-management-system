const {
  createAction,
  createReducer,
  configureStore,
} = require('@reduxjs/toolkit');
const { initialState, add, done, undone, loadTasks } = require('./reducer');
const {
  asyncMiddleware,
} = require('./middleware');
const thunkMiddleware = require('redux-thunk');

const addAction = createAction('add');
const loadTasksAction = createAction('loadTasks');

const taskReducer = createReducer(initialState, {
  [addAction]: add,
  [loadTasksAction]: loadTasks,
});

const store$ = configureStore({
  reducer: taskReducer,
  middleware: [
    thunkMiddleware.default,
    asyncMiddleware
  ],
});

module.exports = {
  store$,
  addAction,
  loadTasksAction,
};
