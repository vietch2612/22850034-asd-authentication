const logger = require('morgan');
const fs = require('fs')

const setupLogger = (app) => {
    app.use(logger('combined', { stream: fs.createWriteStream('./logs/console.log', { flags: 'a' }) }));
    app.use(logger('combined'));
}

exports.setupLogger = setupLogger;