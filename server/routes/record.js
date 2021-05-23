const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes
// The routes will eb added as a middleware and will take control of request starting with
// path /record.
const recordRoutes = express.Router();

// Connection to db
const dbo = require("../db/conn");

// To get list of all the records 
// Get request
recordRoutes.route("/record").get((_, res) => {
    let db_connect = dbo.getDb("employees");
    db_connect
        .collection("records")
        .find({})
        .toArray(function(err, result) {
            if (err)
                throw err;
            res.json(result);
        });
});

// To Create records
// Post request
recordRoutes.route("/record/add").post((req, _) => {
    let db_connect = dbo.getDb("employees");
    let myObj = {
        person_name: req.body.person_name,
        person_position: req.body.person_position,
        person_level: req.body.person_level,
    };
    db_connect.collection("records").insertOne(myObj, function(err, _) {
        if (err)
            throw errr;
    });
});

// Update record by id
recordRoutes.route("/update/:id").post((req, _) => {

    let db_connect = dbo.getDb("employees");
    let myQuery = { id: req.body.id };
    let newValues = {
        $set: {
            person_name: req.body.person_name,
            person_position: req.body.person_position,
            person_level: req.body.person_level,
        },
    };
    db_connect
        .collection("records")
        .updateOne(myQuery, newValues, function(err, _) {
            if (err)
                throw err;
            console.log("1 document updated");
        });
});

// Delete a record
recordRoutes.route("/:id").delete((req, _) => {
    let db_connect = dbo.getDb("employees");
    let myQuery = { id: req.body.id };
    db_connect.collection("records").deleteOne(myQuery, (err, _) => {
        if (err) throw err;
        console.log("1 document deleted");
    });
});

module.exports = recordRoutes

