const {
    createAction,
    createReducer,
    configureStore,
  } = require('@reduxjs/toolkit');

  const { initialState, add, loadWorker, deleteWorker} = require('./reducer');
  const {asyncMiddleware} = require('./middleware')
  
  const addAction = createAction('add');
  const loadDataAction = createAction('loadData');
  const deleteWorkerAction = createAction('deleteData');


  
  const workerReducer = createReducer(initialState, {
    [addAction]: add,
    [loadDataAction]: loadWorker,
    [deleteWorkerAction]: deleteWorker,

  });
  
  const store$ = configureStore({
    reducer: workerReducer,
    middleware: [asyncMiddleware]
  });
  
  module.exports = {
    store$,
    addAction,
    loadDataAction,
    deleteWorkerAction,
  };
  