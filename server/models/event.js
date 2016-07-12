const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  start: Date,
  done: {type: Boolean, default: false},
  created: {type: Date, default: Date()}
});

module.exports = mongoose.model('Event', eventSchema);
