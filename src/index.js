const express = require("express");
const app = express();
const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')
const pollRouter = require('./routes/poll')
const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/auth',authRouter);
app.use('/users',userRouter);
app.use('/poll',pollRouter);



app.listen(process.env.PORT,()=>{
    console.log("Server is running ...")
})