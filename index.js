require('dotenv').config();
const app = require('./app');
const logger = require("./services/logger");

const port = process.env.PORT;

app.listen(port, () => {
    logger.info(`22850034-ASD-Authentication MS is running on port ${port}`);
});