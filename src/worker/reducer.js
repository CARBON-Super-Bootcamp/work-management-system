// setup state
const initialState = [
    // {"id": 8,
    //   "name": "usrok",
    //   "address": "Bandung",
    //   "email": "udin@mail.com",
    //   "phone": "0999888777",
    //   "biografi": "Suka makan"},
    //   {"id": 8,
    //   "name": "usrok",
    //   "address": "Bandung",
    //   "email": "udin@mail.com",
    //   "phone": "0999888777",
    //   "biografi": "Suka makan"}
];
  
  // reduce function
  function add(state, action) {
    state.push(action.payload.data);
    return state;
  }

  function loadWorker(state, action) {
    state = action.payload.data;
    return state;
  }
  
  function deleteWorker(state, action) {
    const workers = state.filter((t) => t.id !== action.payload)
    state = workers;
    return state;
  }
  
  module.exports = {
    initialState,
    add,
    loadWorker,
    deleteWorker
  };
  