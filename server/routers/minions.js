const express = require('express');
const minionsRouter = express.Router({mergeParams: true});
const {  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase, } = require('../db')

// Middleware for id?
// minionsRouter.use('/:id', func)
  
// GET all minions
minionsRouter.get('/', (req, res, next) => {
  const minions = getAllFromDatabase('minions');
  res.send(minions);
})

// GET minion by id
minionsRouter.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const minion = getFromDatabaseById('minions', id);

  if (minion) {
    res.status(200).send(minion);
  } else {
    res.status(404).send();
  }
})

// POST new minion

// PUT existing minion

// DELETE existing minion

module.exports = minionsRouter;