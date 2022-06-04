const express = require('express');
const minionsRouter = express.Router({mergeParams: true});
const {  
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId } = require('../db')

// Middleware for id
minionsRouter.param('id', (req, res, next, minionId) => {
  const minion = getFromDatabaseById('minions', minionId);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
})

  
// GET /api/minions to get an array of all minions.
minionsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('minions'));
})

// POST /api/minions to create a new minion and save it to the database.
minionsRouter.post('/', (req, res, next) => {
  const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
})

// GET /api/minions/:minionId to get a single minion by id.
minionsRouter.get('/:id', (req, res, next) => {
  res.send(req.minion);

})

// PUT /api/minions/:minionId to update a single minion by id.
minionsRouter.put('/:id', (req, res, next) => {
  const updatedMinion = updateInstanceInDatabase('minions', req.body)
  res.send(updatedMinion);
})

// DELETE /api/minions/:id to delete a single minion by id.
minionsRouter.delete('/:id', (req, res, next) => {
  const deleted = deleteFromDatabasebyId('minions', req.params.id);
  if (deleted) {
    res.status(204);  
  } else {
    res.status(404);
  }
  res.send();
})

module.exports = minionsRouter;