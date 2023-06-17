const express = require("express");
const app = express();
const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')
const pollRouter = require('./routes/poll')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/auth',authRouter);
app.use('/user',userRouter);
app.use('/poll',pollRouter);


app.listen(3308,()=>{
    console.log("Server is running ...")
})