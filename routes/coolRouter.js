var express = require('express');
var coolRouter = express.Router();

/* GET users listing. */
coolRouter.get('/', function(req, res, next) {
  res.send('So cool you\'ve traced this!');
});

module.exports = coolRouter;
