const express = require('express');
const minionsRouter = express.Router({mergeParams: true});
const {  
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId } = require('../db')

// Middleware for id
minionsRouter.param('minionId', (req, res, next, minionId) => {
  const minion = getFromDatabaseById('minions', minionId);
  if (minion) {
    // CHECK BELOW LINE
    // req.minionId = minionId;
    req.minion = minion;
    next();
  } else {
    next(new Error("Minion id does not exist"));
  }
})

  
// GET /api/minions to get an array of all minions.
minionsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('minions'));
})

// POST /api/minions to create a new minion and save it to the database.
minionsRouter.post('/', (req, res, next) => {
  const newMinion = addToDatabase('minions', req.body);
  if (newMinion) {
    res.status(201).send(newMinion);
  } else {
    next(new Error());
  }
})

// GET /api/minions/:minionId to get a single minion by id.
minionsRouter.get('/:minionId', (req, res, next) => {
  res.status(200).send(req.minion);

})

// PUT /api/minions/:minionId to update a single minion by id.
minionsRouter.put('/:minionId', (req, res, next) => {
  const updatedMinion = {
      ...req.minion,
      ...req.body
    } 
  const response = updateInstanceInDatabase('minions', updatedMinion)
    res.status(200).send(response);
})

// DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete('/:minionId', (req, res, next) => {
  deleteFromDatabasebyId('minions', req.minion.id) 
  res.status(204).send();
})

// Error handling middleware
minionsRouter.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send(err.message);
});

module.exports = minionsRouter;