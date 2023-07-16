const express = require('express');
const app = express();
const routes = require('./routes/routes');
const { logger } = require('./services/logger');
const bodyParser = require('./services/bodyParser');

bodyParser(app);
logger(app);

app.use(routes);

module.exports = app;