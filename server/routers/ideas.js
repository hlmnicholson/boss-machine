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
ideasRouter.param('id', (req, res, next, ideaId) => {
  const idea = getFromDatabaseById('ideas', ideaId);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
})

// GET /api/ideas to get an array of all ideas.
ideasRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('ideas'));
})

// POST /api/ideas to create a new idea and save it to the database.
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  const newIdea = addToDatabase('ideas', req.body);
  res.status(201).send(newIdea);
})

// GET /api/ideas/:ideaId to get a single idea by id.
ideasRouter.get('/:id', (req, res, next) => {
  res.send(req.idea);

})

// PUT /api/ideas/:ideaId to update a single idea by id.
ideasRouter.put('/:id', checkMillionDollarIdea, (req, res, next) => {
  const response = updateInstanceInDatabase('ideas', req.body)
  res.send(response);
})

// DELETE /api/ideas/:id to delete a single idea by id.
ideasRouter.delete('/:id', (req, res, next) => {
  const deleted = deleteFromDatabasebyId('ideas', req.params.id) 
  if (deleted) {
    res.status(204);  
  } else {
    res.status(404);
  }
  res.send();
})

module.exports = ideasRouter;