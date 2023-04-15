const express = require('express');
const connection = require('../database/connection')
const mysql = require('mysql');
const dotenv = require('dotenv')
dotenv.config()
// Tạo database
connection.query(`CREATE DATABASE ${process.env.DB_NAMEDBSGROUP}`, (error, result) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Database created successfully');
    const db = mysql.createConnection({
      host: `${process.env.DB_HOST}`,
      user: `${process.env.DB_USER}`,
      password: `${process.env.DB_PASSWORD}`,
      database: `${process.env.DB_NAMEDBSGROUP}`,
    });
    db.query(`
        CREATE TABLE users (
        id INT(11) NOT NULL AUTO_INCREMENT,
        fullname VARCHAR(255),
        gender boolean ,
        age INT Check(age>0),
        PRIMARY KEY (id)
    )
    `, (error, result) => {
    if (error) {
        console.error(error);
    } else {
        console.log('Table created successfully');
        db.query(`
            INSERT INTO users (fullname, gender, age) VALUES ('Thanh Nhàn', false, 3),
            ('Tuấn Anh', true, 18),
            ('Đức Khánh', true, 18),
            ('Đình Hà', true, 18)
        `, (error, result) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Data inserted successfully');
            db.query('SELECT * FROM users', (error, result) => {
                if (error) {
                  console.error(error);
                } else {
                  console.log(result);
                }
              });
        }
        });
    }
});
  }
});


/*

*/