require('./styles.css');
const { store$ } = require('./store');
const {loadTable} = require('./view');
const {getListWorker,registerWorker,registerWorkerData} = require('./worker-client')


const form = document.getElementById('form');

form.onsubmit = (event) => {
    event.preventDefault();
    const worker = registerWorkerData();    
    store$.dispatch(registerWorker(worker));
    form.reset();
};

store$.subscribe(() => {
    const state = store$.getState();
    loadTable(state);
});

store$.dispatch(getListWorker);
