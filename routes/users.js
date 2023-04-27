const express = require('express');
const user_router = express.Router();

const con = require('../database/connection');
const valToken = require('../middleware/valToken');
const valUpdate = require('../middleware/valUpdate');

let listUsers = []
con.query('SELECT * FROM users ', function(err,result){
    if(err){
        console.log(err);
        return res.status(500).json("Found ERR!");
    }
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
user_router.get("/",valToken,(req,res)=>{
    con.query('SELECT * FROM users ', function(err,result){
        if(err){
            console.log(err);
            return res.status(500).json("Found ERR!");
        }
        return res.json(result)
    })
    // next();
})

// //insert data into mysql
user_router.post("/",valToken,(req,res) =>{
    const {fullname, gender, age} = req.body
    let sql = `INSERT INTO users ( fullname, gender, age) VALUES (?,?,?)`;
    con.query(sql,[fullname, gender, age],function(err,result){
        if(err)
        {
            console.log("Insert data failed!");
            return res.status(500).json("Found ERR!");

        }
        return res.json(result)
    })
})

//get data at index from mySql
user_router.get("/:id",valToken,(req, res)=>{
    const id = parseInt(req.params.id);
    con.query(`SELECT * FROM users WHERE id = ?`,[id], function(err,result){
        if(err){
            console.log(err);
            return res.status(500).json("Found ERR!");
        }
        else {
            return res.json(result)
        }
    })
})

//update data in mysql
user_router.put("/:id",[valToken,valUpdate],(req, res)=>{
    const id = parseInt(req.params.id);
    const userIndex = listUsers.findIndex((user) => user.id === id);
    // console.log("update vo day");
    if(userIndex == -1)
        res.status(404).json(`User with id ${id} not found`);
    else {
       let sql = 'UPDATE users SET '
       let values = [];

       const {name, age, gender}= req.body

       if(name){
            sql+= "name = ?,";
            values.push(name)
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
                return res.status(500).json("Update failed!")
            }
        return res.json('User updated');
       })
    }
})

//delete data in mysql
user_router.delete("/:id",valToken,(req, res)=>{
    const id = parseInt(req.params.id);
    const userIndex = listUsers.findIndex((user) => user.id === id);
    if(userIndex == -1)
        return res.status(404).json(`User with id ${id} not found`);
    else {
        let sql = 'DELETE FROM users WHERE id = ?';
        con.query(sql,[id],(err, result)=>{
            if(err){
                console.log(err);
                return res.status(500).json('Delete failed')
            }
            return res.status(200).json(' User Deleted!')
        })
    }
})


module.exports = user_router;