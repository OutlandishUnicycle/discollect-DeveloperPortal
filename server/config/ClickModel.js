"use strict"

const Sequelize = require('sequelize');
const db = require('./dbconnect.js');
const Listing = require('./ListingModel.js');
const User = require('./UserModel.js');

var clickModel = db.define('item_clicks', {
  userId: Sequelize.INTEGER,
  listingId: Sequelize.INTEGER,
  state: Sequelize.STRING,
});

clickModel.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'});
clickModel.belongsTo(Listing, {foreignKey: 'listingId', targetKey: 'id'});

clickModel.sync({ force: false });

module.exports = clickModel;
