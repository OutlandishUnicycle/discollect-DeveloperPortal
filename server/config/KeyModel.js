"use strict"

const Sequelize = require('sequelize');
const db = require('./dbconnect.js');
const keyGenerator = require('../keyCreation/keyGen.js');

const Keyholder = db.define('keyholder', {
  email: { type: Sequelize.STRING, allowNull: false, unique: true},
  key: { type: Sequelize.STRING },
  requests: { type: Sequelize.INTEGER, defaultValue: 0 },
  reqLimit: Sequelize.INTEGER,
});

Keyholder.beforeCreate(function(keyholder, options, done) {
  keyholder.key = keyGenerator();
  done(null, keyholder);
});

Keyholder.sync({force : false});

module.exports = Keyholder;
