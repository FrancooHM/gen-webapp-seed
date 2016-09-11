'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var stockSchema = new Schema({
  stock: { type: Number },
  tapFK: { type: Schema.Types.ObjectId, ref: 'Tap' },
  beerFK: { type: Schema.Types.ObjectId, ref: 'Beer' }
});

module.exports = mongoose.model('Stock', stockSchema);