require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes/routes');
const { setupLogger } = require('./services/logger');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

setupLogger(app);

app.use(routes);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});