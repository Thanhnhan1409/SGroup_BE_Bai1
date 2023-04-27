const express = require("express");
const connection = require("../database/connection");
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();
// Tạo database
connection.query(
  `CREATE DATABASE ${process.env.DB_NAMEDBSGROUP}`,
  (error, result) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Database created successfully");
      const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAMEDBSGROUP,
      });
      db.query(
        `
        CREATE TABLE users (
        id INT(11) NOT NULL AUTO_INCREMENT,
        username VARCHAR(255),
        password VARCHAR(255),
        salt VARCHAR(255),
        name VARCHAR(255),
        age INT Check(age>0),
        gender boolean ,
        email VARCHAR(255),
        PRIMARY KEY (id),
        unique (username)
    )
    `,
        (error, result) => {
          if (error) {
            console.error(error);
          } else {
            console.log("Table created successfully");
            db.query(
              `
            INSERT INTO users (username, password, salt, name, age, gender, email) VALUES ('thanhnhan123', "nhan123", "abc","Thanh Nhàn", 18, false, 'thanhnhan1409@gmail.com' )
        `,
              (error, result) => {
                if (error) {
                  console.error(error);
                } else {
                  console.log("Data inserted successfully");
                  db.query("SELECT * FROM users", (error, result) => {
                    if (error) {
                      console.error(error);
                    } else {
                      console.log(result);
                    }
                  });
                }
              }
            );
          }
        }
      );
    }
  }
);

/*

*/
