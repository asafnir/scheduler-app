var Event = require('../models/event');

exports.create = function(req, res){
  // todo: check that date is valid 
  Event.create(req.body, function (err, event) {
    if (err) {
      console.log('Error create event');
      return res.status(500).send('Something went wrong');
    }
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
