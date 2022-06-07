const { getFromDatabaseById } = require('./db');

const checkID = (req, res, next) => {
  let name = req.url.match(/work/) ? 'work' : 'minions';
  let id = req.params.workId ? req.params.workId : req.params.minionId;
  const data = getFromDatabaseById(name, id);
  if (data) {
    req.data = data;
    next();
  } else {
    res.status(404).send();
    next();
  }
}

module.exports = checkID;