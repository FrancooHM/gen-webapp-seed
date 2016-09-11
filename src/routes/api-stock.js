import Stock from '../lib/Stock'
import Beer from '../lib/Beer'

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
var beerStyleSchema = require('../models/Stock');
var router = express.Router();


/* BEER */

///////////////////////////////////////////////
/////////////////// POST /////////////////////
///////////////////////////////////////////////

router.post('/', function(req, res, next) {
  console.log("req.body: " + req.body.beerID);
  //Something cool happens
});

///////////////////////////////////////////////
/////////////////// PATCH /////////////////////
///////////////////////////////////////////////

router.patch('/', function(req, res, next) {
  console.log("req.body: " + req.body.beerID);
  beerSchema.findOne({
    "beerID": req.body.beerID
  }).exec((err, results) => {
    beerStockCallbackHandler(req, res, err, results)
  });
});

function beerStockCallbackHandler(req, res, err, results) {
  var beer = results;
  beer.stock = req.body.stock;

  var beerObject = new beerSchema(beer);

  beerObject.save().then((err, results) => {
    callbackHandler(res, err, results)
  });
}

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
