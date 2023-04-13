var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '140903',
    database: 'sgroupbe'
});
connection.connect(function(err){
    if(err)
        console.log('Ket noi khong thanh cong');
});

module.exports = connection;