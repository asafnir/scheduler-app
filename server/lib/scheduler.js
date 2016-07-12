// Use setInterval to check in db if event done
'use strict';
var _ = require("underscore")
var async = require("async")
var mongoose = require('mongoose');
var moment = require('moment');

function setIntervalForTask(model, task, from, callback){

  var interval = getTimeInMs(task.start, from);
  // console.log(moment().duration(now.diff(task.start)));
  var taskInterval = setInterval(function() {
    markTaskAsDone(model, task.id, this);
    callback(task);
  }, interval);
}

function getTimeInMs(date, from) {
  var differenceTravel = Math.floor(date.getTime() - from.getTime());
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
