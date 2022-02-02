var express = require('express');

var app = express();
var router = express.Router();

app.use(express.json());

/**
 * Connecting to RDS database on AWS
 */
const mysql = require('mysql2');
const con = mysql.createConnection({
    host: "fishfrytoursdbinstance.ce1skhgo9kq8.ca-central-1.rds.amazonaws.com",
    user: "fishfryadmin",
    password: "fishfrypassword"
});


/**
 * Get the list of boats along with their status.
 */
router.get('/', (req, res) => {
    con.connect(function(err) {
        con.query(`SELECT * FROM FishFryToursDB.boats`, function(err, result, fields) {
            if (err) res.send(err);
            if (result) res.send(result);
        });
    });
});


/**
 * Create API for adding new boat. Fields in the boat will be its name and status.
 */
router.post('/addBoat', (req, res) => {
    console.log("inside addboat call");
    console.log("request is: ", req.body);
    con.connect(function(err) {
        con.query(`INSERT INTO FishFryToursDB.boats (name,status) values ('${req.body.name}', '${req.body.status}')`, function(err, result, fields) {
            if (err) res.send(err);
            if (result) res.send(result);
            console.log("result is: ", result);
        });
    });
});

/**
 * Update API to change the status of boat. This will be called when the user wants to move the boat
 *  to some other status via dragging.
 */
router.put('/updateboat', (req, res) => {
    console.log("inside update call");
    console.log("request is: ", req.body);
    
    con.connect(function(err) {
        con.query(`UPDATE FishFryToursDB.boats SET status='${req.body.status}' WHERE id=${req.body.id}`, function(err, result, fields) {
            if (err) res.send(err);
            if (result) res.send(result);
        });
    });
});

module.exports = router;