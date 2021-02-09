const Busboy = require('busboy');
const { saveFile } = require('../../storage/storage');
const {
  register,
  listTask,
  completedTask,
  removeTask,
} = require('../lib/task');
const fs = require('fs');
const url = require('url');
const path = require('path');
const mime = require('mime-types');
const nats = require('../../message/nats');

class TaskController {
  static async read(req, res) {
    try {
      const result = await listTask();
      res.statusCode = 200;
      res.write(JSON.stringify(result));
      res.end();
    } catch (err) {
      console.log(err);
      ontrollers / storage.j;
      res.statusCode = 500;
      res.end();
    }
  }

  static create(req, res) {
    const busboy = new Busboy({ headers: req.headers });
    let messageBus;
    let data = {
      assigneeId: '',
      name: '',
      attachment: '',
    };

    let finished = false;
    function abort() {
      req.unpipe(busboy);
      if (!req.aborted) {
        res.statusCode = 413;
        res.end();
      }
    }

    busboy.on('field', (fieldname, val) => {
      data[fieldname] = val;
    });

    busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
      console.log(file)
      switch (fieldname) {
        case 'attachment':
          try {
            const folder = 'attachment';
            data.attachment =
              'localhost:9998/attachment/' +
              (await saveFile(file, mimetype, folder));
          } catch (err) {
            console.log(err);
            abort();
            return;
          }

          if (finished) {
            try {
              const task = await register(data); // add insert task here
              messageBus = {
                status: 'success',
                message: 'success add task',
              };

              res.write(
                JSON.stringify(task)
              );

              nats.publish('task.create', messageBus);
            } catch (err) {
              //add error handling
              messageBus = {
                status: 'error',
                message: 'error add task',
              };
              res.write('401');
            }
            // nats.publish('task.create', messageBus);
            res.end();
          }
          break;
        default: {
          const noop = new Writable({
            write(chunk, encding, callback) {
              setImmediate(callback);
            },
          });
          file.pipe(noop);
        }
      }
    });

    busboy.on('finish', async () => {
      finished = true;
    });

    req.on('aborted', abort);
    busboy.on('error', abort);

    req.pipe(busboy);
  }

  static async delete(req, res) {
    const id = +req.params.id;
    let messageBus;

    try {
      const Task = await removeTask(id);
      const output = JSON.stringify({
        msg: `Task with id = ${id} has been deleted.`,
      });
      messageBus = {
        status: 'success',
        message: 'success delete task',
      };
      res.write(output);
      res.statusCode = 200;
      res.end();
      nats.publish('task.delete', messageBus);
    } catch (err) {
      messageBus = {
        status: 'error',
        message: 'error delete task',
      };
      res.statusCode = 500;
      res.end();
      nats.publish('task.delete', messageBus);
    }
  }

  static async completed(req, res) {
    const id = +req.params.id;
    let messageBus;
    try {
      await completedTask(id);
      res.statusCode = 200;
      res.write(
        JSON.stringify({
          msg: `Task with id = ${id} has been finished.`,
        })
      );
      messageBus = {
        status: 'success',
        message: 'success completed task',
      };
      res.end();
      nats.publish('task.completed', messageBus);
    } catch (err) {
      res.statusCode = 500;
      messageBus = {
        status: 'error',
        message: 'error completed task',
      };
      res.end();
      nats.publish('task.completed', messageBus);
    }
  }
}

module.exports = TaskController;
