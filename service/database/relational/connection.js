/* eslint-disable no-unused-vars */
const { Sequelize } = require('sequelize')
require('dotenv').config()
const connection = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_CONNECTION,
  logging: false,
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
})


module.exports = {connection}
