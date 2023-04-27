const crypto = require('crypto');

function hash(plainPassword, salt){
    if(!salt){
        salt = crypto.randomBytes(16).toString('hex');
    }
    const hashedPassword = crypto.pbkdf2Sync(
        plainPassword,
        salt, 
        1000, 
        64,
        'sha1')
        .toString('hex');
        return{
            salt: salt,
            pass: hashedPassword
        }
}
module.exports = hash;