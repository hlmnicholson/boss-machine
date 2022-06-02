const express = require('express');
const apiRouter = express.Router();
const minionsRouter = require('./routers/minions.js');

// Minions
apiRouter.use('/minions', minionsRouter);
// apiRouter.get('/', minionsRouter)

// Ideas

// Meetings

module.exports = apiRouter;
