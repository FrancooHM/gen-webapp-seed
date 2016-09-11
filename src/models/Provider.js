var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var providerSchema = new Schema({
  providerName: {type: String},
  beerFK: { type: Schema.Types.ObjectId, ref: 'Beer' }
});

module.exports = mongoose.model('Provider', providerSchema);
