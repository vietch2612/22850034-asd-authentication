require('dotenv').config();
const app = require('./app');
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`22850034-ASD-Authentication MS is running on port ${port}`);
});