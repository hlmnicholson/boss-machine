const express = require('express');
const apiRouter = express.Router();
const minionsRouter = require('./routers/minions');
const ideasRouter = require('./routers/ideas');


// Minions
apiRouter.use('/minions', minionsRouter);
// apiRouter.get('/', minionsRouter)

// Ideas
apiRouter.use('/ideas', ideasRouter);

// Meetings

module.exports = apiRouter;
