const express = require('express');
const minionsRouter = express.Router({mergeParams: true});
const {  
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId } = require('../db');

// Middleware for minionId
minionsRouter.param('minionId', (req, res, next, minionId) => {
  const minion = getFromDatabaseById('minions', minionId);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

// Middleware for workId
minionsRouter.param('workId', (req, res, next, workId) => {
  let work = getFromDatabaseById('work', workId);
  if (work) {
    req.work = work;
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

// GET /api/minions/:id to get a single minion by id.
minionsRouter.get('/:minionId', (req, res, next) => {
  res.send(req.minion);

})

// PUT /api/minions/:id to update a single minion by id.
minionsRouter.put('/:minionId', (req, res, next) => {
  const updatedMinion = updateInstanceInDatabase('minions', req.body);
  res.send(updatedMinion);
})

// DELETE /api/minions/:id to delete a single minion by id.
minionsRouter.delete('/:minionId', (req, res, next) => {
  const deleted = deleteFromDatabasebyId('minions', req.params.minionId);
  if (deleted) {
    res.status(204);  
  } else {
    res.status(404);
  }
  res.send();
})


// GET /api/minions/:id/work to get an array of all work for the specified minon.
minionsRouter.get('/:minionId/work', (req, res, next) => {
  const minionWork = getAllFromDatabase('work').filter(e => e.minionId === req.params.minionId)
  if(minionWork) {
    res.send(minionWork);
    next();
  } else {
    res.status(400).send();
    next();
  }
})

// POST /api/minions/:id/work to create a new work object and save it to the database.
minionsRouter.post('/:minionId/work', (req, res, next) => {
  const newWork = addToDatabase('work', req.body);
  if(newWork) {
    res.status(201).send(newWork);
    next();
  } else {
    res.status(400).send();
    next();
  }
})

// PUT /api/minions/:id/work/:workId to update a single work by id.
minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
  if(req.minion.id !== req.work.minionId) {
    res.status(400).send();
    next();
  } else {
    const updatedMinion = updateInstanceInDatabase('work', req.body);
    if (updatedMinion) {
      res.status(201).send(updatedMinion);
      next();
    } else {
      res.status(400).send();
      next();
    }
  }
})

// DELETE /api/minions/:id/work/:workId to delete a single work by id.
minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
  if(req.minion.id !== req.work.minionId) {
    res.status(400).send();
    next();
  } else {
    const deleted = deleteFromDatabasebyId('work', req.params.workId);
    if (deleted) {
      res.status(204);  
    } else {
      res.status(404);
    }
    res.send();
  }
})
module.exports = minionsRouter;