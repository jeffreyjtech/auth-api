'use strict';

// Import 3rd party dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Use 3rd part dependencies
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import API modules

// middleware
const logger = require('./middleware/logger');
// routes
const authRoutes = require('./auth/routes');
const v1Routes = require('./routes/v1');
const v2Routes = require('./routes/v2');
// error-handlers
const handle500 = require('./error-handlers/500');
const handle404 = require('./error-handlers/404');

// Use routers/middleware/error-handlers
app.use(logger);

app.use(authRoutes);
app.use(v1Routes);
app.use(v2Routes);

app.use(handle404);
app.use(handle500);

function start(PORT) {
  app.listen(PORT, () => {
    console.log(`Server Up on ${PORT}`);
  });
}

module.exports = {
  app,
  start,
};
