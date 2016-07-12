var Event = require('../models/event');
var Scheduler = require('../lib/scheduler');

exports.create = function(req, res){
  // todo: check that date is valid
  Event.create(req.body, function (err, event) {
    var io = req.app.get('socketio');
    if (err) {
      console.log('Error create event');
      return res.status(500).send('Something went wrong');
    }
    Scheduler.schedulerTask(Event, event, function(response){
      console.log(response);
      io.on('connection', function (socket) {
        socket.emit('event done', { res: response });
      });
    });
    res.json(event);
  });
}

exports.all = function(req, res){
  Event.find({}, function(err, events) {
    if (err) {
      console.log('Error in first query');
      return res.status(500).send('Something went wrong getting the data');
    }
    return res.json(events);
  });
}
