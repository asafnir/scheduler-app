var assert = require('chai').assert;
var Event = require('../server/models/event');
var mongoose = require("mongoose");
var moment = require('moment');
var Scheduler = require('../server/lib/scheduler');
var sinon = require('sinon');

Date.prototype.addMinutes = function(minutes) {
    var copiedDate = new Date(this.getTime());
    return new Date(copiedDate.getTime() + minutes * 60000);
}

mongoose.connect("mongodb://localhost:27017/scheduler-test");

describe('scheduler', function() {
  var clock;
  var minuteToAdd = 4;
  var now = new Date();
  var time = now.addMinutes(minuteToAdd)
  var data = {name: 'Move this', start: time}
  var event = new Event(data)
  var interval = Scheduler.getTimeInMs(time, now)

  before(function (done) {
    event.save()
    done();
  });

  beforeEach(function (done) {
    clock = sinon.useFakeTimers();
    done();
  })

  afterEach(function (done) {
    clock.restore();
    done();
  });

  it('Should return time in ms', function(done){
      assert.equal(Math.floor(interval/1000), (minuteToAdd * 60));
      done();
  });

  it('Should run the task in the giving time', function(done){
    var task;
    Scheduler.schedulerTask(Event, event, now, function(response){
      task = response;
    });
    clock.tick(interval + (minuteToAdd*1000)+1);
    assert.equal(event.name, task.name);
    done();
  });

  it('should change done to true', function(done) {
    Event.findById(event.id, function(err, event) {
      if (err) {
        done(err);
      }
      assert.equal(event.done, true);
      done();
    });
  });



});
