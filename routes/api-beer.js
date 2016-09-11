'use strict';

var _Beer = require('../lib/Beer');

var _Beer2 = _interopRequireDefault(_Beer);

var _BeerStyle = require('../lib/BeerStyle');

var _BeerStyle2 = _interopRequireDefault(_BeerStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

///////////////////////////////////////////////
//////////////////// TODO /////////////////////
/*

import all new models and migrate to the new system version.

- Add provider insertion.
- Add style insertion.
- Delete stock integration. Actually stock is a new concept,
not about the beer but about the in-site-keezer-beer.

*/
///////////////////////////////////////////////

var express = require('express');
var mongoose = require('mongoose');
var beerSchema = require('../models/Beer');
var beerStyleSchema = require('../models/BeerStyle');

///////////////////////////////////////////////
//////////////////// TODO /////////////////////
/*

Add parameter to beerStyleFK

*/
///////////////////////////////////////////////
var router = express.Router();

/* BEER */

///////////////////////////////////////////////
//////////////////// POST /////////////////////
///////////////////////////////////////////////

router.post('/', function (req, res, next) {
  var beer = new _Beer2.default(req.body.name, req.body.IBU, req.body.SRM, req.body.ABV,
  // req.body.beerOrganolepticDescription,
  // req.body.stock,
  // req.body.breweryName,
  req.body.beerID,
  // req.body.tapID,
  req.body.beerFantasyName);

  console.log(beer);

  var beerObject = new beerSchema(beer);

  //save returns a promise directly instead find that needs to call exec http://stackoverflow.com/questions/29736965/mongoose-error-on-promise-with-save
  beerObject.save().then(function (err, results) {
    callbackHandler(res, err, results);
  });
});

router.post('/style', function (req, res, next) {
  var beerStyle = new _BeerStyle2.default(req.body.name, req.body.beerOrganolepticDescription);

  console.log(beerStyle);

  var beerStyleObject = new beerStyleSchema(beerStyle);

  //save returns a promise directly instead find that needs to call exec http://stackoverflow.com/questions/29736965/mongoose-error-on-promise-with-save
  beerStyleObject.save().then(function (err, results) {
    callbackHandler(res, err, results);
  });
});

///////////////////////////////////////////////
///////////////////// GET /////////////////////
///////////////////////////////////////////////

router.get('/', function (req, res, next) {

  //exec
  beerSchema.find({}).exec(function (err, results) {
    callbackHandler(res, err, results);
  });
});

function callbackHandler(res, err, results) {
  if (err) {
    console.log(err);
    res.status(500).send(err.message);
  } else {
    console.log(results);
    res.status(200).jsonp(results);
  }
};

module.exports = router;