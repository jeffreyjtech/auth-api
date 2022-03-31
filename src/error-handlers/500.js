'use strict';

function handle500(err, req, res, next) {
  console.error('Server Error:\n  ');
  console.error(err.message || 'Unknown error');
  res.status(err.status || 500).send(err.message || 'Server Error');
}

module.exports = handle500;