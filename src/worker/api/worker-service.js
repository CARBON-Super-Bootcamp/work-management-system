const { client } = require('./client');

async function listWorkerApi() {
  return await client.get('http://localhost:9999/worker');
}

async function addWorkerApi(worker) {
  return await client.post('http://localhost:9999/worker', worker);
}

async function deleteWorkerApi(id) {
  return await client.delete(`http://localhost:9999/worker/${id}`);
}

 
module.exports = {
  listWorkerApi,
  addWorkerApi,
  deleteWorkerApi
};
