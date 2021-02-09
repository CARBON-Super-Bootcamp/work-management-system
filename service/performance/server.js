const { createServer } = require('http');
const { stdout } = require('process');

const routers = require('./routers');

function run(){
    const server = createServer((req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Request-Method', '*');
      res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', '*');

      if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
      }
      routers(req, res);
    });
    
    const PORT = 1234;
    server.listen(PORT, () => {
      stdout.write(`🛰 server performance listening on port ${PORT}\n`);
    });
}

function stop() {
  if (server) {
    server.close();
  }
}

module.exports = { run, stop };
