const express = require('express');
const auth_router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const validate = require('../middleware/index');
const con = require('../database/connection');
const hashPassword = require('../middleware/hash');
const valLogin = require('../middleware/valLogin');

auth_router.post('/register', validate, (req, res, next) => {
    const { username, password, confirmPassword, email, gender, name, age } =
        req.body;
    if (password !== confirmPassword)
        return res.status(400).json('The password confirm wrong!');
    con.query(
        'SELECT * FROM users WHERE username=?',
        username,
        (err, result) => {
            if (err) return res.status(500).json('Internal server error!');
            const user = result[0];
            if (user) return res.status(400).json('Username is already taken!');

            const objPass = hashPassword(password);
            let sql = `INSERT INTO users ( username, password,salt,  age, gender, name,email) VALUES (?,?,?,?,?,?,?)`;
            con.query(
                sql,
                [
                    username,
                    objPass.pass,
                    objPass.salt,
                    age,
                    gender,
                    name,
                    email,
                ],
                function (err, result) {
                    if (err) {
                        console.log('Insert data failed!');
                        return res.status(500).json('Found ERR!');
                    }
                    return res.json('ok');
                }
            );
            // next()
        }
    );
});

auth_router.post('/login',valLogin,(req, res) => {
    const { username, password } = req.body;
    con.query(
        'SELECT * FROM users WHERE username=?',
        username,
        (err, result) => {
            if (err) {
                return res.status(500).json('Found Err!');
            }
            const user = result[0];
            if (!user) {
                return res.status(401).json('Not found!');
            }
            const pass = hashPassword(password, user.salt);
            if (pass.pass === user.password) {
                return res.status(200).json({
                    token: jwt.sign(
                        {
                            name: user.name,
                            age: user.age,
                            gender: user.gender,
                            email: user.email,
                        },
                        process.env.SECRET,
                        {
                            algorithm: 'HS256',
                            expiresIn: '1d',
                            issuer: 'nhan',
                        }
                    ),
                });
            }
            return res.status(400).json('Invalid username or password!');
        }
    );
});

module.exports = auth_router;
