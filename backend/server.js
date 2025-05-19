//import important modules
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json());

//create mysql connection
//get data from .env
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSOWRD,
    database: process.env.DB_NAME
});

//attempt to connect and log success/error
db.connect((err)=>{
    if(err){
        console.error("Error connecting to MySQL: ", err);
        return;
    }
    console.log("Connected to MySQL database");
});


//api route sample
// this route queries the dataavse and return all rows from the table
app.get('api/data', (reg, res)=>{
    db.query('SELECT * FROM Users', (err,results)=>{
        if (err){
            res.status(500),json({error: err.nessage});
            return;
        }
        res.json(results);
    });
});
//set port for server (.env)
const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log('Server is running on port ${PORT}');
});