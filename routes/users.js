const express = require('express');
const user_router = express.Router();

const validate = require('../middleware/index')
const con = require('../database/connection')

let listUsers = []
con.query('SELECT * FROM users ', function(err,result){
    if(err)
        console.log(err);
    listUsers = result;
})

// const fs = require('fs');   
// const path = require('path')

// const filePath = path.join(__dirname, '../data/users.json');

// let a=[];
//Neu filePath hop le
// if(fs.existsSync(filePath)){
//     //doi Json => array
//     a = JSON.parse(fs.readFileSync(filePath));
// }

//get data from mySql
user_router.get("/",(req,res)=>{
    con.query('SELECT * FROM users ', function(err,result){
        if(err)
            console.log(err);
        return res.send(result)
    })
    // next();
})

// //insert data into mysql
user_router.post("/",(req,res) =>{
    const {fullname, gender, age} = req.body
    let sql = `INSERT INTO users ( fullname, gender, age) VALUES (?,?,?)`;
    con.query(sql,[fullname, gender, age],function(err,result){
        if(err)
        {
            console.log("Insert data failed!");
            throw err
        }
        return res.send(result)
    })
})

//get data at index from mySql
user_router.get("/:id",(req, res)=>{
    const id = parseInt(req.params.id);
    con.query(`SELECT * FROM users WHERE id = ?`,[id], function(err,result){
        if(err){
            console.log(err);
        }
        else {
            return res.send(result)
        }
    })
})

//update data in mysql
user_router.put("/:id",validate,(req, res)=>{
    const id = parseInt(req.params.id);
    const userIndex = listUsers.findIndex((user) => user.id === id);
    if(userIndex == -1)
        res.status(404).send(`User with id ${id} not found`);
    else {
       let sql = 'UPDATE users SET '
       let values = [];

       const fullname = req.body.fullname;
       const gender = req.body.gender;
       const age = req.body.age;

       if(fullname){
            sql+= "fullname = ?,";
            values.push(fullname)
       }
       if(gender){
            sql+= "gender = ?,"
            values.push(gender)
       }
       if(age){
            sql+="age = ?,"
            values.push(age)
       }
       sql = sql.slice(0,-1);

       sql+=" WHERE id = ?";
       values.push(id);

       con.query(sql,values,(err,result)=>{
        if(err)
            {
                console.log(err);
                res.status(500).send("Update failed!")
            }
        res.send('User updated');
       })
    }
})

//delete data in mysql
user_router.delete("/:id",(req, res)=>{
    const id = parseInt(req.params.id);
    const userIndex = listUsers.findIndex((user) => user.id === id);
    if(userIndex == -1)
        res.status(404).send(`User with id ${id} not found`);
    else {
        let sql = 'DELETE FROM users WHERE id = ?';
        con.query(sql,[id],(err, result)=>{
            if(err){
                console.log(err);
                return res.status(500).send('Delete failed')
            }
            return res.status(200).send(' User Deleted!')
        })
    }
})

module.exports = user_router;