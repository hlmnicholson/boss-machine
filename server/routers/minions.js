const express = require('express');
const minionsRouter = express.Router({mergeParams: true});
const {  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId } = require('../db')

// Middleware for id?
// minionsRouter.use('/:id', func)
minionsRouter.param('minionId', (req, res, next, minionId) => {
  // const idToFind = Number(minionId);
  const minion = getFromDatabaseById('minions', minionId);
  if (minion) {
    req.minionId = minionId;
    req.minion = minion;
    next();
  } else {
    res.status(404).send('Minion not found.')
  }
})

  
// GET all minions
minionsRouter.get('/', (req, res, next) => {
  const minions = getAllFromDatabase('minions');
  res.send(minions);
})

// GET minion by id
minionsRouter.get('/:minionId', (req, res, next) => {
  res.status(200).send(req.minion);

})

// POST new minion
minionsRouter.post('/', (req, res, next) => {
  const newMinion = addToDatabase('minions', req.body);
  if (newMinion) {
    res.status(201).send(newMinion);
  } else {
    res.status(404).send();
  }
})

// PUT existing minion
minionsRouter.put('/:minionId', (req, res, next) => {
  const updatedMinion = {
      ...req.minion,
      ...req.body
    } 
  const response = updateInstanceInDatabase('minions', updatedMinion)
    res.status(200).send(response);
})

// DELETE existing minion
minionsRouter.delete('/:minionId', (req, res, next) => {
  deleteFromDatabasebyId('minions', req.minionId) 
  res.status(204).send();
})

module.exports = minionsRouter;