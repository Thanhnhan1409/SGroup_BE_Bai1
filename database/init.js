const express = require('express');
const connection = require('../database/connection')
const mysql = require('mysql');

// Tạo database
connection.query('CREATE DATABASE SGroupBE', (error, result) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Database created successfully');
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '140903',
        database: 'SGroupBE',
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


