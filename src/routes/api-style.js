import Beer from '../lib/Beer'
import BeerStyle from '../lib/BeerStyle'
var express = require('express');
var mongoose = require('mongoose');
var beerSchema = require('../models/Beer');
var beerStyleSchema = require('../models/BeerStyle');
var router = express.Router();

/* BEER */

///////////////////////////////////////////////
//////////////////// POST /////////////////////
///////////////////////////////////////////////

router.post('/', function(req, res, next) {
  var beerStyle = new BeerStyle(req.body.name,
    req.body.beerOrganolepticDescription);

  console.log(beerStyle);

  var beerStyleObject = new beerStyleSchema(beerStyle);

  //save returns a promise directly instead find that needs to call exec http://stackoverflow.com/questions/29736965/mongoose-error-on-promise-with-save
  beerStyleObject.save().then((err, results) => {
    callbackHandler(res, err, results)
  });
});

///////////////////////////////////////////////
///////////////////// GET /////////////////////
///////////////////////////////////////////////

router.get('/', function(req, res, next) {
  //exec
  beerStyleSchema.find({}).exec((err, results) => {
    callbackHandler(res, err, results)
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
