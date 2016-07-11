// Use setInterval to check in db if event done
'use strict';
var _ = require("underscore")
var async = require("async")
var mongoose = require('mongoose');
var moment = require('moment');
var fromTime = new Date();

function setIntervalForTask(model, task, callback){
  var interval = getTimeInMs(task.start);
  // console.log(moment().duration(now.diff(task.start)));
  var taskInterval = setInterval(function() {
    markTaskAsDone(model, task.id, this);
    callback(task);
  }, interval);
}

function getTimeInMs(date) {
  var toTime = new Date(date);
  var differenceTravel = Math.floor(toTime.getTime() - fromTime.getTime());
  return differenceTravel
}
function markTaskAsDone(records, id, interval) {
  clearInterval(interval)
  records.findById(id, function(err, record) {
    if (err) throw err;
    record.done = true;
    record.save(function(err) {
      if (err) throw err;
      console.log('record successfully updated!');
    });
  });
}

module.exports.schedulerTask = setIntervalForTask;
module.exports.markTaskAsDone = markTaskAsDone
module.exports.getTimeInMs = getTimeInMs
