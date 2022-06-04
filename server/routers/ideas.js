const express = require('express');
const ideasRouter = express.Router({mergeParams: true});
const {  
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId } = require('../db');
const checkMillionDollarIdea = require('../checkMillionDollarIdea');

// Middleware for id
ideasRouter.param('ideaId', (req, res, next, ideaId) => {
  const idea = getFromDatabaseById('ideas', ideaId);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    next(new Error("Idea id does not exist"));
  }
})

// GET /api/ideas to get an array of all ideas.
ideasRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('ideas'));
})

// POST /api/ideas to create a new idea and save it to the database.
ideasRouter.post('/', (req, res, next) => {
  const newIdea = addToDatabase('ideas', req.body);
  const checkIdea = checkMillionDollarIdea(newIdea.numWeeks, newIdea.weeklyRevenue)
  if (newIdea && checkIdea) {
    res.status(201).send(newIdea);
  } else {
    next(new Error('Invalid new idea!'));
  }
})

// GET /api/ideas/:ideaId to get a single idea by id.
ideasRouter.get('/:ideaId', (req, res, next) => {
  res.status(200).send(req.idea);

})

// PUT /api/ideas/:ideaId to update a single idea by id.
ideasRouter.put('/:ideaId', (req, res, next) => {
  const updatedIdea = {
      ...req.idea,
      ...req.body
    } 
  const checkIdea = checkMillionDollarIdea(updatedIdea.numWeeks, updatedIdea.weeklyRevenue);

  if(checkIdea) {
    const response = updateInstanceInDatabase('ideas', updatedIdea)
      res.status(200).send(response);
  } else {
    next(new Error('Make it more profitable!'));
  }
})

// DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasRouter.delete('/:ideaId', (req, res, next) => {
  deleteFromDatabasebyId('ideas', req.idea.id) 
  res.status(204).send();
})

ideasRouter.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send(err.message);
});

module.exports = ideasRouter;