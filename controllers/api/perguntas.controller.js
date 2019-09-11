var config = require('config.json');
var express = require('express');
var router = express.Router();
var perguntasService = require('services/perguntas.service');

// routes
router.post('/createPerguntas', createPerguntas);
router.get('/getPerguntas', getPerguntas);

module.exports = router;

function createPerguntas(req, res) {
    perguntasService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getPerguntas(req, res) {    
    perguntasService.getPerguntas(req.session.userId)
        .then(function (perguntas) {
            if (perguntas) {
                res.send(perguntas);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updatePerguntas(req, res) {
    var userId = req.session.userId;
    if (req.params._id !== userId) {
        // can only update own account
        return res.status(401).send('You can only update your own account');
    }

    userService.update(userId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteUser(req, res) {
    var userId = req.session.userId;
    if (req.params._id !== userId) {
        // can only delete own account
        return res.status(401).send('You can only delete your own account');
    }

    userService.delete(userId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}