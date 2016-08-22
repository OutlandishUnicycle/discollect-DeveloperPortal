"use strict"

const maindb = require('../config/dbconnect.js');
const Listing = require('../config/ListingModel.js');
const seq = require('sequelize');
const User = require('../config/UserModel.js');
const Clicks = require('../config/ClickModel.js');

const timeSeparations = {
  hour: {
    time: (new Date(new Date() - 60 * 60 * 1000)),
    split: (60 * 1000 * 6),
    divisions: 10,
    labels: [
      '0 - 6',
      '7 - 12',
      '13 - 18',
      '19 - 24',
      '25 - 30',
      '31 - 36',
      '37 - 42',
      '43 - 48',
      '49 - 54',
      '55 - 60',
    ],
  },
  day: {
    time: (new Date(new Date() - 24 * 60 * 60 * 1000)),
    split: (60 * 60 * 1000 * 2),
    divisions: 12,
    labels: [
      '00:00 - 02:00',
      '02:00 - 04:00',
      '04:00 - 06:00',
      '06:00 - 08:00',
      '08:00 - 10:00',
      '10:00 - 12:00',
      '12:00 - 14:00',
      '14:00 - 16:00',
      '16:00 - 18:00',
      '18:00 - 20:00',
      '20:00 - 22:00',
      '22:00 - 24:00',
    ],
  },
  week: {
    time: (new Date(new Date() - 24 * 60 * 60 * 1000 * 7)),
    split: (24 * 60 * 60 * 1000),
    divisions: 7,
    labels: [
      '',
    ],
  },
  month: {
    time:(new Date(new Date() - 24 * 60 * 60 * 1000 * 30)),
    split: (24 * 60 * 15 * 1000 * 30),
    divisions: 4,
    labels: [
      'week 1',
      'week 2',
      'week 3',
      'week 4',
    ],
  },
  month3: {
    time: ((new Date(new Date() - 24 * 60 * 60 * 1000 * 30 * 3))),
    split: (24 * 60 * 60 * 1000 * 30),
    divisions: 3,
    labels: [
      'month 1',
      'month 2',
      'month 3',
    ],
  },
  month6: {
    time: ((new Date(new Date() - 24 * 60 * 60 * 1000 * 30 * 6))),
    split:(24 * 60 * 60 * 1000 * 30),
    divisions: 6,
    labels: [
      'month 1',
      'month 2',
      'month 3',
      'month 4',
      'month 5',
      'month 6',
    ],
  },
  year: {
    time: (new Date(new Date() - 24 * 60 * 60 * 1000 * 365)),
    split: ((24 * 60 * 60 * 1000 * 365) / 12),
    divisions: 12,
    labels: [
      'month 1',
      'month 2',
      'month 3',
      'month 4',
      'month 5',
      'month 6',
      'month 7',
      'month 8',
      'month 9',
      'month 10',
      'month 11',
      'month 12',
    ],
  },
}
const allCategories = ['appliances', 'fashion', 'furniture', 'books', 'electronics', 'tools'];

module.exports = {
  allClicks: (res) => {
    Clicks.findAll({
      attributes: ['userId', 'createdAt'],
      include: [{
          model: Listing,
      }]
    })
    .then((results) => {
      res.send(results);
    })
  },
  allListings: (res) => {
    Listing.findAll({
      attributes: ['id', 'title', 'category', 'createdAt', 'zipcode'],
      order: [['id', 'DESC']],
    })
    .then((results) => {
      res.send(results);
    })
  },
  getUserReferencesByCategory: (userId, res) => {
    Listing.findAll({
      attributes: ['id', 'title', 'category', 'createdAt', 'zipcode'],
      where: {
        giverId: userId,
      },
      order: [['id', 'DESC']],
    })
    .then((results) => {
      let output = results.reduce((all, item) => {
        if (all[item.category]) {
          all[item.category].push(item);
        } else {
          all[item.category] = [item];
        }
        return all;
      }, {})
      res.send(output);
    })
  },
  getListingReferences: (listingId, res) => {
    Listing.findAll({
      attributes: ['id', 'title', 'category', 'createdAt', 'zipcode', 'category'],
      where: {
        id: listingId,
      },
      order: [['createdAt', 'DESC']],
    })
    .then((listingData) => {
      Clicks.findAll({
        attributes: ['userId', 'createdAt'],
        where: {
          listingId: listingId,
        },
        order: [['createdAt', 'DESC']],
      })
      .then((clickData) => {
        res.send(JSON.stringify({listingData, clickData}));
      })
    });
  },
  getUserReferences: function (userId, res) {
    Listing.findAll({
      attributes: ['id', 'title', 'createdAt', 'category', 'zipcode', 'category'],
      where: {
        $or: {
          giverId: userId,
          takerId: userId
        }
      },
      order: [['createdAt', 'DESC']],
    })
    .then((userListingData) => {
      Clicks.findAll({
        attributes: ['listingId', 'createdAt'],
        where: {
          userId: userId,
        },
        order: [['createdAt', 'DESC']],
      })
      .then((userClickData) => {
        res.send(JSON.stringify({userListingData, userClickData}));
      })
    });
  },
  clicksOverTimeByCategory: (query, res) => {
    let category = query.cat === 'all-categories' ? allCategories : query.cat;
    let earliestDate = timeSeparations[query.past].time || 0;
    if (!Array.isArray(query.cat)) {
      category = [category];
    }
    Clicks.findAll({
      where: {
        createdAt: {
          $lt: new Date(),
          $gt: earliestDate,
        },
      },
      include: [{
          model: Listing,
          where: {
            category: {
              $in: category,
            }
          },
      }],
      order: [['createdAt', 'DESC']],
    })
    .then((results) => {
      return results.reduce((all, item) => {
        if(all[item.Listing.category]) {
          all[item.Listing.category]++;
        } else {
          all[item.Listing.category] = 1;
        }
        return all;
      }, {})
    })
    .then((results) => {
      let labels = [];
      let data = [];
      for (let category in results) {
        labels.push(category);
        data.push(results[category]);
      }
      res.send({data, labels, label: `Clicks by Category per ${query.past}`});
    })
  },

  clicksOverTimeBySingleCategory: (query, res) => {
    let category = query.cat === 'all-categories' ? allCategories : [query.cat];
    let past = query.past;
    let earliestDate = timeSeparations[past] || 0;
    Clicks.findAll({
      attributes: ['createdAt', 'id'],
      where: {
        createdAt: {
          $lt: new Date(),
          $gt: earliestDate,
        },
      },
      include: [{
          model: Listing,
          attributes: [],
          where: {
            category: {
              $in: category,
            }
          },
      }],
      order: [['createdAt', 'DESC']],
    })
    .then((results) => {
      let template = timeSeparations[past];
      let now = new Date();
      let output = [];
      for (let i=1; i <= template.divisions; i++) {
        let a = results.filter((item) => {
          let tempDate = new Date(item.createdAt);
          let lowerLimit = now.getTime() - (template.split * i);
          let upperLimit = now.getTime() - (template.split * (i - 1));
          return upperLimit > tempDate.getTime() && tempDate.getTime() > lowerLimit;
        });
        output.push(a.length);
      }
      // build labels for chart
      let labels = template.labels.reverse();
      let label = `${query.cat} over the last ${past}`;
      output.reverse();
      res.send({data: output, labels, label, test: results.length});
    });
  },

  listingsByState: (res) => {
    const prevMonth = new Date(new Date() - 24 * 60 * 60 * 1000 * 30);
    Clicks.findAll({
      where: {
        createdAt: {
          $lt: new Date(),
          $gt: prevMonth,
        },
      },
    })
    .then((results) => {
      let byState = results.reduce((all, item) => {
        if (item.state === null) {
          return all;
        } else if (all[item.state]) {
          all[item.state]++;
        } else {
          all[item.state] = 1;
        }
        return all;
      }, {})
      res.send(byState);
    })
  }
};
