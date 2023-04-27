var mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAMEDBSGROUP,
    // multipleStatements: false, -- thực thi 1 câu lệnh
});
connection.connect(function(err){
    if(err)
        console.log('Ket noi khong thanh cong');
    else 
    console.log('Ket noi thanh cong!');

});

module.exports = connection;