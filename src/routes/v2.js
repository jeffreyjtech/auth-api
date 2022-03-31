'use strict';

'use strict';

const express = require('express');
const permissions = require('../auth/middleware/acl');
const bearerAuth = require('../auth/middleware/bearer');
const dataModules = require('../models');

const router = express.Router();

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    console.error('Invalid model');
    next('Invalid Model');
  }
});

router.use(bearerAuth);

router.get('/api/v2/:model', permissions('read'), handleGetAll);
router.get('/api/v2/:model/:id', permissions('read'), handleGetOne);
router.post('/api/v2/:model', permissions('create'), handleCreate);
router.put('/api/v2/:model/:id', permissions('update'), handleUpdate);
router.delete('/api/v2/:model/:id', permissions('delete'), handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.get(id);
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj);
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}

module.exports = router;