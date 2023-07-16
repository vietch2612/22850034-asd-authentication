const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const logger = (app) => {
    const loggerMiddleware = (req, res, next) => {
        const logData = {
            method: req.method,
            url: req.originalUrl,
            params: req.params,
            query: req.query,
            body: req.body,
        };

        const start = new Date();

        res.on('finish', () => {
            const end = new Date();
            const responseTime = end - start;
            logData.response = {
                status: res.statusCode,
                responseTime: responseTime + 'ms',
            };

            console.log(logData);
        });

        next();
    };

    const accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { flags: 'a' });

    app.use(loggerMiddleware);
    app.use(morgan('combined', { stream: accessLogStream }));
};

exports.logger = logger;