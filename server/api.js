const express = require('express');
const apiRouter = express.Router();
const minionsRouter = require('./routers/minions');
const ideasRouter = require('./routers/ideas');
const meetingsRouter = require('./routers/meetings');

// Minions
apiRouter.use('/minions', minionsRouter);

// Ideas
apiRouter.use('/ideas', ideasRouter);

// Meetings
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;
