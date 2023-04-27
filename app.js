const express = require("express"); // Require module express vào project
const app = express(); // Tạo một app mới
require('dotenv').config()
const crypto = require('crypto');
const userRoute = require('./routes/users')
const authRouter = require('./routes/auth')


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/users', userRoute);
app.use('/auth',authRouter)

app.listen(process.env.PORT_NODEJS,()=>{
    console.log("Server is running ...")
})

var jwt = require("jsonwebtoken");
// const { use } = require('./routes/users');

//--------------------------------------

const user = {
  name: "Nhan",
  usernmae: "thanhnhan1409",
  password: "123123",
  age: 14,
  gender: "female",
  email: "1@gmail.com",
};



const payload = {
  name: "Nhan",
  usernmae: "thanhnhan1409",
  age: 14,
  gender: "female",
  email: "1@gmail.com",
};


const {
    publicKey,
    privateKey
} = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });

// encode
const token = jwt.sign(payload, privateKey, {
    algorithm: "RS256", //Thuat toan ma hoa => Signature(=HS256(header + payload, SECRET)), default = HS256
    expiresIn: "1d", // Thoi han su dung cuar JWt
    issuer: "Nhan", //Nguoi cap phat JWT
  })
console.log(
  
);

// decode
const userToken=token;
console.log(jwt.verify(userToken,publicKey));

//-----------------------------------

const dbs=[
    {
        username: 'nhan',
        age: 3,
        email:"nhan@gmail.com",
        id : 1,
        password:'123123',
        balance:"10000000"
    },
    {
        username: 'tuananh',
        age: 10,
        email:"nhan1@gmail.com",
        id : 2,
        password:'123123',
        balance:"10000000"
    }
]
app.post("/login",(req,res)=>{
    const {username, password} = req.body;
    const user = dbs.find(user =>user.username === username);
    if(!user)
        return res.status(401).json( 'Not found');
    if(user.password===password){
        return res.status(200).json(jwt.sign({
            username:user.username,
            age:user.age,
            email:user.email
        },privateKey,{
            algorithm:"RS256",
            expiresIn:"1d",
            issuer:"nhan"
        }));
    }
        
})

app.get("/balance",(req,res)=>{
    const jwtHeader = req.headers['authorization'].substring(7); //jwjHeader: Bearer <token>
    const username =req.query.username
    //verify
    try {
        const isTokenValid = jwt.verify(jwtHeader,publicKey)
        if(!isTokenValid)
            return res.status(401).json('InValid');
        if(isTokenValid.username ===username){
            const user = dbs.find(user => user.username === username)
            if(!user)
                return res.status(404).json('Not found!');
            
            return res.status(200).json({
                balance: user.balance
            });
        }
    } catch (error) {
        console.log(err);
    }
})

//-----------------------------------

//21024-Hash

// function hashPassword(input){
//     const hashObj =crypto.createHash('sha512');
//     const hashedPassword = hashObj.update(input).digest('hex');
//     return hashedPassword;
// }

// const plainPass = 'nhan';
// const hashedPassword = hashPassword(plainPass)
// console.log(hashedPassword);

//-----------------------------------

//hash with Salt
// const crypto = require('crypto');

// const plainPassword = 'nhan';

// function hashWithSalt(input){

//     const salt = crypto.randomBytes(16).toString('hex');
//     //Hash with Salt
//     const hashedPassword = crypto.pbkdf2Sync(input,salt,1000,64,'sha512').toString('hex');
//     return hashedPassword;

// }

// for(let i=1; i<=5; i++)
// {
//    console.log({
//     plainPassword: plainPassword,
//     hash:hashWithSalt(plainPassword)
//    } );
//     console.log('------------------------');
// }

//-----------------------------------

//encryption
// symmetiic: use one sercet key
    //Quy luat: 
        //1. Append secret key vao cuoi chuoi
        //2. Dao nguoc chuoi
// const secretkey = process.env.SECRET;

// function encrypt(input){
//     const inputWitdPadding = input + secretkey;
//     const reversedString = inputWitdPadding.split('').reverse().join('');

//     return reversedString;
// }

// function decrypt(input){
//     let decryptedString = input.split('').reverse().join('').slice(0,-secretkey.length);
//     return decryptedString
// }
// console.log(decrypt(encrypt('nhan')));

//-----------------------------------

// // Generate key pair
// const {
//     publicKey,
//     privateKey
// } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });

// // Encrypt data with public key
// function encrypt(plainText) {
//     const cipherText = crypto.publicEncrypt({
//         key: publicKey,
//         oaepHash: 'sha256',
//         padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//     }, Buffer.from(plainText));
//     return cipherText.toString('base64');
// }

// // Decrypt data with private key
// function decrypt(cipherText) {
//     const decryptedText = crypto.privateDecrypt({
//         key: privateKey,
//         oaepHash: 'sha256',
//         padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//     }, Buffer.from(cipherText, 'base64'));
//     return decryptedText.toString();
// }

// // Decrypt the encrypted data
// const encryptedData = encrypt('nhan');
// const decryptedData = decrypt(encryptedData);
// console.log("Encrypted: " + encrypt(encryptedData));
// console.log("Decrypted: " + decryptedData);
