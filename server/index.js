const path = require('path');
const express = require('express');
const webpack = require('webpack');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config.js');
const fs = require('fs');
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const MONGODB_URI = "mongodb://localhost:27017/scheduler-app"

// Routes
var routesConfig = require('./config/routes');

/**
 * Load environment variables from .env file
 */
// dotenv.load({ path: '.env' });

/**
* Create Express server.
*/
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

routesConfig(app);

/**
 * Connect to MongoDB.
 */

mongoose.connect(isDeveloping ? MONGODB_URI : process.env.MONGODB_URI);
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(config.output.path, 'index.html')));
    res.end();
  });
} else {
  const indexPath = path.join(__dirname, '../public/index.html')
  const publicPath = express.static(path.join(__dirname, '../public'))
  app.use('/public', publicPath);
  app.get('*', function response(req, res) {
    res.sendFile(indexPath);
  });
}

const server = app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});

var io = require('socket.io')(server);
app.set('socketio', io);
