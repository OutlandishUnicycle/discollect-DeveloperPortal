"use strict"

const maindb = require('../config/dbconnect.js');
const Listing = require('../config/ListingModel.js');
const seq = require('sequelize');
const User = require('../config/UserModel.js');
const Clicks = require('../config/ClickModel.js');

module.exports = {
  dates: (res) => {
    let a = new Date;
    res.send(a);
  }
}
