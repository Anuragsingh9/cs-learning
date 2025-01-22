const express = require("express");
const app = express();
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"node_crud"
});

const username ='Anurag Singh';
const email ='anurag@gmail.com';
const dob ='2022-02-17';

db.connect(function(error){
    if(error){
        throw error;
    }
    console.log('DB connection established');
    db.query("show tables",function(error,result){
        if(error){
            throw error;
        }else{
            console.log(result);
            // Insert Query
            // db.query("insert into users (username,email,dob) values (?,?,?)",[username,email,dob])
            
            // Select Query
            // db.query("select * from users",function(error,result){
            //     console.log(result);
            // })

            // Update Query
            // db.query("update users set username = ?, dob = ? where id = ?", [username,email,1])

            // Delete Query
            // db.query("delete from users where id = ?",[4],function(error,result){
            //     console.log(result);
            //     if(error){
            //         throw error;
            //     }else{
            //         console.log("Record deleted");
            //     }
            // })


        }
    });
});

const port = 3000;
app.listen(3000,() => {
    console.log(`Server is runing on ${port}`);
});