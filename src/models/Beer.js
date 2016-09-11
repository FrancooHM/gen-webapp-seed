var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var beerSchema = new Schema({
  beerID: {type: Number},
  beerFantasyName: {type: String},
  IBU: {type: Number},
  SRM: {type: Number},
  ABV: {type: Number},
  beerStyleFK: { type: Schema.Types.ObjectId, ref: 'BeerStyle' }
});

module.exports = mongoose.model('Beer', beerSchema);
