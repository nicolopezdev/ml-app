require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const port = process.env.SERVER_PORT;
const api = require('./api/index');

(function bootstrap() {

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));

    // Parse application/json
    app.use(bodyParser.json());

    // Security
    app.use(helmet());
    app.use(helmet.xssFilter());
    app.use(cors())

    // API routes
    app.use('/api', api.router);

    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
})();