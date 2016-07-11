var assert = require('chai').assert;
var Event = require('../server/models/event');
var mongoose = require("mongoose");
var moment = require('moment');
var Scheduler = require('../server/lib/scheduler');
var sinon = require('sinon');


mongoose.connect("mongodb://localhost:27017/scheduler-test");

describe('scheduler', function() {
  var clock;
  var minuteToAdd = 4;
  var time = moment().add(minuteToAdd, 'minute').format();
  var data = {name: 'Move this', start: time}
  var event = new Event(data)
  var interval = Scheduler.getTimeInMs(time)

  before(function () {
    clock = sinon.useFakeTimers();
    event.save()
  });

  after(function () { clock.restore(); });

  it('Should return time in ms', function(){
      assert.equal(Math.floor(interval/1000), (minuteToAdd * 60) - 1);
  });

  it('Should run the task in the giving time', function(){
    var task;
    Scheduler.schedulerTask(Event, event, function(response){
      task = response;
    });
    console.log(interval);
    clock.tick(interval + (minuteToAdd*1000)+1);
    assert.equal(event.name, task.name);
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
