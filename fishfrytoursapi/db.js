/*
* Connecting to mysql
*/
const mysql = require('mysql');
const con = mysql.createConnection({
    host: "fishfrytoursdbinstance.ce1skhgo9kq8.ca-central-1.rds.amazonaws.com",
    user: "fishfryadmin",
    password: "fishfrypassword"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.end();
});