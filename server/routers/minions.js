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
minionsRouter.get('/:minionId', (req, res, next) => {
  const id = req.params.minionId;
  const minion = getFromDatabaseById('minions', id);
  if (minion) {
    res.status(200).send(minion);
  } else {
    res.status(404).send();
  }
})

// POST new minion
minionsRouter.post('/', (req, res, next) => {
  const newMinion = addToDatabase('minions', req.body);
  if (newMinion) {
    res.status(200).send(newMinion);
  } else {
    res.status(404).send();
  }
})

// PUT existing minion
minionsRouter.put('/:minionId', (req, res, next) => {
  const id = req.params.minionId;
  const minion = getFromDatabaseById('minions', id);

  if (minion) {
    const updatedMinion = {
      ...minion,
      ...req.body
    } 
    const response = updateInstanceInDatabase('minions', updatedMinion)
    res.status(200).send(response);
  } else {
    res.status(404).send();
  }
})

// DELETE existing minion
minionsRouter.delete('/:minionId', (req, res, next) => {
  const id = req.params.minionId;
  deleteFromDatabasebyId('minions', id) 
  res.status(204).send();
})

// DELETE all minions
minionsRouter.delete('/', (req, res, next) => {
  deleteAllFromDatabase('minions') 
  res.status(204).send();
})

module.exports = minionsRouter;