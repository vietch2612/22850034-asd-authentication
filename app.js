const express = require('express');
const app = express();
const routes = require('./routes/routes');
const logger = require('./services/logger')

const bodyParser = require('./services/bodyParser');
const morganMiddleware = require("./middlewares/morgan.middleware");

bodyParser(app);

app.use(morganMiddleware);
app.use(routes);

module.exports = app;