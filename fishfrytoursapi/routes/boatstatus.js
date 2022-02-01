var express = require('express');

var app = express();
var router = express.Router();
// var db = require('../db');

const mysql = require('mysql');
const con = mysql.createConnection({
    host: "fishfrytoursdbinstance.ce1skhgo9kq8.ca-central-1.rds.amazonaws.com",
    user: "fishfryadmin",
    password: "fishfrypassword"
});

router.get('/', (req, res) => {
    console.log("inside boatstatus call");
    con.connect(function(err) {
        con.query(`SELECT * FROM FishFryToursDB.boatstatus`, function(err, result, fields) {
            console.log("result is: ", result);
            console.log("error is: ", err);
            console.log("fields: ", fields);
            if (err) res.send(err);
            if (result) res.send(result);
        });
    });
});

module.exports = router;