"use strict"

const Sequelize = require('sequelize');
// const secrets = require('../../secrets.js');
const secrets = {};

let dbpassword = process.env.dbpassword;
let host = process.env.host;
let port = process.env.port;
;

if (secrets.dbpassword) {
  dbpassword = secrets.dbpassword;
  host = secrets.mysql.host;
  port = secrets.mysql.port;
}

const db = new Sequelize('discollectDB', 'jordan', dbpassword, {
  host: host,
  port: port,
  timezone: '-07:00',
});

db
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

module.exports = db;
