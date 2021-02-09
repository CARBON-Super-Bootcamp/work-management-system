const { client } = require('./client');

async function fetchTasksApi() {
  return await client.get('http://localhost:9998/task');
}

async function addTaskApi(task) {
  return await client.post('http://localhost:9998/task',  task);
}

async function doneTaskApi(id) {
  return await client.put(`http://localhost:9998/done?id=${id}`);
}

async function undoneTaskApi(id){
  return await client.put(`http://localhost:9998/undone?id=${id}`);
}
 
module.exports = {
  fetchTasksApi,
  addTaskApi,
  doneTaskApi,
  undoneTaskApi,
};
