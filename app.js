const express = require('express'); // Require module express vào project
const app = express(); // Tạo một app mới

const userRoute = require('./routes/users')


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/users', userRoute);

app.listen(3005,()=>{
    console.log("Server is running ...")
})