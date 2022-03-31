'use strict';

require('dotenv').config();
const app = require('./src/server.js');
const { db } = require('./src/models');

db.sync().then(() => {
  console.log('Database synced');
  app.start(process.env.PORT || 3000);
});