"use strict"

const router = require('express').Router();
const q = require('./apiQueries/basicQueries.js');

router.get('/user', (req, res) => {
  let userId = req.query.userId;
  q.getUserReferences(userId, res);
});

router.get('/user/category', (req, res) => {
  let userId = req.query.userId;
  q.getUserReferencesByCategory(userId, res);
});

router.get('/listing', (req, res) => {
  let listingId = req.query.listingId;
  q.getListingReferences(listingId, res);
});

router.get('/all/clicks', (req, res) => {
  q.allClicks(res);
});

router.get('/all/listings', (req, res) => {
  q.allListings(res);
});

router.get('/category', (req, res) => {
  q.clicksByCategory(req.query, res);
});

router.get('/time/category', (req, res) => {
  q.clicksOverTimeByCategory(req.query, res);
});

router.get('/category/time', (req, res) => {
  q.clicksOverTimeBySingleCategory(req.query, res);
});

router.get('/state', (req, res) => {
  q.listingsByState(res);
});

module.exports = router;
