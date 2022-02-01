var express = require('express');

var app = express();
var router = express.Router();

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Connecting Database
 */
const mysql = require('mysql');
const con = mysql.createConnection({
    host: "fishfrytoursdbinstance.ce1skhgo9kq8.ca-central-1.rds.amazonaws.com",
    user: "fishfryadmin",
    password: "fishfrypassword"
});


/**
 * Get the list of boats along with their status
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
 * Create API called for adding boat
 */
router.post('/addBoat', (req, res) => {
    console.log("inside addboat call");
    console.log("request is: ", req.body);
    con.connect(function(err) {
        con.query(`INSERT INTO FishFryToursDB.boats (name,status) values ('${req.body.name}', "DOCKED")`, function(err, result, fields) {
            if (err) res.send(err);
            if (result) res.send(result);
            console.log("result is: ", result);
        });
    });
});

/**
 * Update API to change the status of boat
 */
router.put('/updateboat', (req, res) => {
    console.log("inside addboat call");
    console.log("request is: ", req.body);
    con.connect(function(err) {
        con.query(`UPDATE FishFryToursDB.boats SET status='${req.body.status}' WHERE name='${req.body.name}' AND id='${req.body.id}')`, function(err, result, fields) {
            if (err) res.send(err);
            if (result) res.send(result);
        });
    });
});



module.exports = router;