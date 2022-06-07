// const express = require('express');
// const workRouter = express.Router({mergeParams: true});
// const {  
//   getAllFromDatabase,
//   getFromDatabaseById,
//   addToDatabase,
//   updateInstanceInDatabase,
//   deleteFromDatabasebyId } = require('../db');

// // Middleware for id
// // workRouter.param('id', (req, res, next, minionId) => {
// //   const work = getFromDatabaseById('work', minionId);
// //   if (work) {
// //     req.body = work;
// //     next();
// //   } else {
// //     res.status(404).send();
// //   }
// // });

// workRouter.get('/', (req, res, next) => {
//   const id = req.params.id;
//   console.log(req.params);
//   console.log(req.body);
//   res.send(getFromDatabaseById('work', id))
// })



// module.exports = workRouter;