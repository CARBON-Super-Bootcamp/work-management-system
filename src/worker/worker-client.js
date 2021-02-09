const { listWorkerApi, addWorkerApi, deleteWorkerApi } = require('./api/worker-service');
const {addAction,loadDataAction, deleteWorkerAction} = require('./store');

const getListWorker = async (dispatch,getState) => {
    const workersAsync = await listWorkerApi();
    dispatch(loadDataAction(workersAsync));
}

const registerWorker = (worker) => async (dispatch,getState) => {
    try {
        const result = await addWorkerApi(worker);
        dispatch(addAction(result));
    } catch (error) {
        throw error;
    }
}

const deleteWorker = (workerId) => async (dispatch,getState) => {
    try {
        await deleteWorkerApi(workerId);
        dispatch(deleteWorkerAction(workerId));
    } catch (error) {
        throw error;
    }
}

function registerWorkerData(){
    const form = new FormData();
    const name = document.getElementById('name');
    const address = document.getElementById('address');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const biografi = document.getElementById('biografi');
    const photo = document.getElementById('photo');
    
    form.append('name',name.value);
    form.append('address',address.value);
    form.append('phone',phone.value);
    form.append('email',email.value);
    form.append('biografi',biografi.value);
    form.append('photo',photo.files[0]);
    
    return form;
}


module.exports = {getListWorker,registerWorker,registerWorkerData, deleteWorker}