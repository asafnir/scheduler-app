var assert = require('chai').assert;
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/scheduler-test");
var Event = require('../server/models/event');

describe('Event', function() {
  describe('#save()', function() {
    it('should save without error', function(done) {
      data = {name: 'Move this', start: Date.now()}
      var event = new Event(data)
      event.save(function(err, event) {
        if (err) {
          done(err);
        }
        done()
      });
    });
  });
});
