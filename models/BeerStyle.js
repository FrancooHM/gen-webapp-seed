'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var beerStyleSchema = new Schema({
  name: { type: String },
  beerOrganolepticDescription: { type: String }
});

module.exports = mongoose.model('BeerStyle', beerStyleSchema);