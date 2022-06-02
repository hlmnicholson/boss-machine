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
minionsRouter.put('/:minionId', (req, res, next) => {
  const id = req.params.minionId;
  const minion = getFromDatabaseById('minions', id);
  // {id: id, ...req.body}

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
  const id = req.params.id;
  const minion = getFromDatabaseById('minions', id);

  if (minion) {
    deleteFromDatabasebyId('minions', id) 
    res.status(204).send();
  } else {
    res.status(404).send();
  }
})

module.exports = minionsRouter;