var eventController = require('../controllers/event');

module.exports = function(app){
  app.post('/event', eventController.create);
  app.get('/events', eventController.all);
  // app.get('/event/:id', eventController.get);
};
