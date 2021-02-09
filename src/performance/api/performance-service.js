const { client } = require('./client');

async function fetchTasksApi() {
  return await client.get('http://localhost:1234/summary');
}

 
module.exports = {
  fetchTasksApi,
};
