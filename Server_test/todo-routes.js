var express = require('express');

var app = module.exports = express.Router();

var Todo = require('./todo');


// GET
// Get all open Todos
app.get('/todos', function (req, res) {
    Todo.find({}, function (err, todos) {
        if (err) {
            return res.json({ "success": false, "msg": "Error while creating Todo", "error": err });
        }

        res.status(200).send({ "success": true, "result": todos });
    });
});


// POST
// Create a new Todo
app.post('/todos', function (req, res) {
    if (!req.body.Parkplatzname) {
        return res.status(400).send({ "success": false, "msg": "You need to send the text of the todo!" });
    }

    var newTodo = new Todo({
        Parkplatzname: req.body.Parkplatzname,
        Preis: req.body.Preis,
        Adresse: req.body.Adresse,
        Kapazität: req.body.Kapazität,
        lat: req.body.lat,
        lng: req.body.lng,
        Offnungszeiten: req.body.Offnungszeiten
    });

    newTodo.save(function (err) {
        if (err) {
            console.log("some error: ", err);
            return res.json({ "success": false, "msg": "Error while creating Todo", "error": err });
        }
        res.status(201).send({ "success": true, "msg": 'Successful created new Todo.' });
    });
});