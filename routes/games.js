var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Game = require('../models/Game.js');

/* GET /games listing. */
router.get('/', function(req, res, next) {
  Game.find(function (err, games) {
    if (err) return next(err);
    res.json(games);
  });
});

/* POST /games */
router.post('/', function(req, res, next) {
  Game.create(req.body, function (err, game) {
    if (err) return next(err);
    res.json(game);
  });
});

/* POST /games/playerMoves */
router.post('/playerMoves/:id', function(req, res, next) {
  Game.playerMoves(req.params.id,req.body.rowIndex, req.body.colIndex , function (err, game) {
    if (err) return next(err);
    res.json(game);
  });
});

/* POST /games/replay */
router.post('/replay/:id', function(req, res, next) {
  Game.replay(req.params.id, function (err, game) {
    if (err) return next(err);
    res.json(game);
  });
});

/* GET /games/id */
router.get('/:id', function(req, res, next) {
  Game.findById(req.params.id, function (err, game) {
    if (err) return next(err);
    res.json(game);
  });
});

/* PUT /games/:id */
router.put('/:id', function(req, res, next) {
  Game.findByIdAndUpdate(req.params.id, req.body, function (err, game) {
    if (err) return next(err);
    res.json(game);
  });
});

/* DELETE /games/:id */
router.delete('/:id', function(req, res, next) {
  Game.findByIdAndRemove(req.params.id, req.body, function (err, game) {
    if (err) return next(err);
    res.json(game);
  });
});

module.exports = router;