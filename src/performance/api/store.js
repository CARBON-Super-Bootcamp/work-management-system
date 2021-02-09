const {
  createAction,
  createReducer,
  configureStore,
} = require('@reduxjs/toolkit');
const { initialState, updateData } = require('./reducer');
const { asyncMiddleware } = require('./middleware');
// const thunkMiddleware = require('redux-thunk');

const updateDataAction = createAction('updateData')

const todoReducer = createReducer(initialState, {
  [updateDataAction] : updateData
});

const store$ = configureStore({
  reducer: todoReducer,
  middleware: [asyncMiddleware]
});

module.exports = {
  store$,
  updateDataAction,
};
