var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var tapSchema = new Schema({
  tapID: {type: Number}
});

module.exports = mongoose.model('Tap', tapSchema);
