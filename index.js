const express = require('express'),
  errorhandler = require('errorhandler'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('config');

const app = express();
const log4js = require('log4js');

const { MONGO_URI } = config.get('DB');
const { PORT } = config.get('SERVER');
const { connectDB } = require('./utils');

const isProduction = process.env.PRODUCTION || config.get('isProduction');

const dbConnection = connectDB();
const logger = log4js.getLogger();

logger.level = config.get('LOGGER_LVL');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

if (!isProduction) {
  app.use(errorhandler());
}

if (!dbConnection) {
  //   return;
}

if (!isProduction) {
  mongoose.set('debug', true);
}

app.use(require('./routes'));

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function (err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

// start server
app.listen(process.env.PORT || PORT, () => {
  console.log('Listening on port ' + PORT);
});
