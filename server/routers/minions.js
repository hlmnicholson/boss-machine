const express = require('express');
const { min } = require('mocha/lib/reporters');
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
    next(new Error("Minion id does not exist"));
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
    next(new Error());
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


// Error handling middleware
minionsRouter.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send(err.message);
});

module.exports = minionsRouter;