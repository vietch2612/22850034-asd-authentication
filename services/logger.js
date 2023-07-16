const logger = require('morgan');
const fs = require('fs');
const { Console } = require('console');

const setupLogger = (app) => {
    // Tạo định dạng log tùy chỉnh
    // const customFormat = ':method :url :status :response-time ms - :res[content-length]';

    // Tạo writable stream để ghi log vào tệp
    const logStream = fs.createWriteStream('./logs/console.log', { flags: 'a' });

    // Tạo một console mới dựa trên writable stream
    const consoleLogger = new Console({ stdout: logStream, stderr: logStream });

    // Middleware Morgan với định dạng log tùy chỉnh và writable stream
    app.use(logger('info', { stream: logStream }));

    // Middleware Morgan với định dạng log tùy chỉnh (để in log vào console)
    app.use(logger('info', { stream: consoleLogger }));
};

exports.setupLogger = setupLogger;