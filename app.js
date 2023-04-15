const express = require('express'); // Require module express vào project
const app = express(); // Tạo một app mới

const userRoute = require('./routes/users')

const dotenv = require('dotenv')
dotenv.config()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/users', userRoute);


app.listen(process.env.PORT_NODEJS,()=>{
    console.log("Server is running ...")
})

// cách lấy biến môi trường: env

// console.log(process.env);
// console.log(process.env.DB_HOST);

// console.log(process.env.DB_NAMEDBSGROUP);