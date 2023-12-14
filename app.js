const express = require('express');
const app = express();
const routes = require('./routes/routes');
const cors = require('cors');

const bodyParser = require('./services/bodyParser');
const morganMiddleware = require("./middlewares/morganMiddleware");

const allowedOrigins = ['https://localhost:*'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }

}));

bodyParser(app);

app.use(morganMiddleware);
app.use(routes);

module.exports = app;