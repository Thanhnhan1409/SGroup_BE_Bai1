const express = require('express');
const user_router = express.Router();

const fs = require('fs');
const { join } = require('path');
const path = require('path')

const filePath = path.join(__dirname, '../data/users.json');
console.log(filePath)

let a=[];
//Neu filePatj hop le
if(fs.existsSync(filePath)){
    //doi Json => array
    a = JSON.parse(fs.readFileSync(filePath));
}

user_router.get("/",(req,res)=>{
    return res.status(200).json(a);
})

user_router.get("/:id",(req, res)=>{
    const id = parseInt(req.params.id);
    const user = a.find(user => user.id === id);
    if(user){
        return res.status(200).json(user)
    }else {
        return res.status(404).json("Not found!");
    }
})

user_router.post("/",(req, res)=>{
    newUser ={
        id: a.length+1,
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age
    }
    a.push(newUser);
    fs.writeFileSync(filePath,JSON.stringify(a));
    return res.status(201).json(a[a.length-1])
})

user_router.put("/:id",(req, res)=>{
    const id = parseInt(req.params.id);
    const userIndex = a.findIndex((user) => user.id === id);
    if(userIndex == -1)
        res.status(404).send(`User with id ${id} not found`);
    else {
        const userUpdate = Object.assign({},a[userIndex],req.body);
        a[userIndex] = userUpdate;
        fs.writeFileSync(filePath, JSON.stringify(a));
        res.status(204).end();
    }
})

user_router.delete("/:id",(req, res)=>{
    const id = parseInt(req.params.id);
    const userIndex = a.findIndex((user) => user.id === id);
    if(userIndex === -1)
        return res.status(404).send(`User with id ${id} not found`);
    else {
        a = a.filter(user => user.id !== id);
        fs.writeFileSync(filePath,JSON.stringify(a));
        res.status(204).end();
    }
})

module.exports = user_router;