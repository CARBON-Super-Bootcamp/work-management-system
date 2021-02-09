const url = require('url');
const path = require('path');
const mime = require('mime-types');
// eslint-disable-next-line no-unused-vars
const { Readable } = require('stream');
const { Client } = require('minio');
const { create } = require('../task/controllers/task.service');
// save data worker
require('dotenv').config()
const client = new Client({
  endPoint: process.env.MINIO_HOST,
  port: parseInt(process.env.MINIO_PORT),
  useSSL: false,
  // accessKey: 'local-minio',
  // secretKey: 'local-test-secret',
  accessKey: process.env.MINIO_USER,
  secretKey: process.env.MINIO_PASSWORD,
});
/**
 * generate random file name
 * @param {string} mimetype mimetype
 * @returns {string} generated file name
 */
function randomFileName(mimetype) {
  return (
    new Date().getTime() +
    '-' +
    Math.round(Math.random() * 1000) +
    '.' +
    mime.extension(mimetype)
  );
}

/**
 * save file to file system
 * @param {Readable} file readable file stream
 * @param {string} mimetype mime type
 * @param {string} folder folder name
 * @returns {Promise<string>} generated filename
 */

 

function saveFile(file, mimetype,folder) {
  const destname = randomFileName(mimetype);
  return new Promise((resolve, reject) => {
    client.putObject(folder, destname, file, (err, etag) => {
      if (err) {
      reject(err)
      }
      // resolve("localhost:9999/"+folder+"/"+destname)
      resolve(destname)
    });
  });
}

async function serviceFile(req, res, folder) {
  const uri = url.parse(req.url, true);
  const objectName = uri.pathname.replace("/"+folder+"/", '');
  if (!objectName) {
    res.statusCode = 400;
    res.write('request tidak sesuai');
    res.end();
  }
  try {
    await client.statObject(folder, objectName);
  } catch (err) {
    if (err && err.code === 'NotFound') {
      res.statusCode = 404;
      res.write('file tidak ditemukan');
      res.end();
      return;
    }
    res.statusCode = 500;
    res.write('gagal membaca file');
    res.end();
    return;
  }
  try {
    const objectRead = await client.getObject(folder, objectName);
    res.setHeader('Content-Type', mime.lookup(objectName));
    res.statusCode = 200;
    objectRead.pipe(res);
  } catch (err) {
    res.statusCode = 500;
    res.write('gagal membaca file');
    res.end();
    return;
  }
}

async function readService(req, res, folder) {
  const uri = url.parse(req.url, true);
  const objectName = uri.pathname.replace("/"+folder+"/",'');
  console.log(objectName)
  if (!objectName) {
    res.statusCode = 400;
    res.write('request tidak sesuai');
    res.end();
  }
  try {
    await client.statObject(folder, objectName);
  } catch (err) {
    if (err && err.code === 'NotFound') {
      res.statusCode = 404;
      res.write('file tidak ditemukan');
      res.end();
      return;
    }
    res.statusCode = 500;
    res.write('gagal membaca file');
    res.end();
    return;
  }
  try {
    const objectRead = await client.getObject(folder, objectName);
    res.setHeader('Content-Type', mime.lookup(objectName));
    res.statusCode = 200;
    objectRead.pipe(res);
  } catch (err) {
    res.statusCode = 500;
    res.write('gagal membaca file');
    res.end();
    return;
  }
}


module.exports = {
  saveFile,
  serviceFile,
  readService
};

