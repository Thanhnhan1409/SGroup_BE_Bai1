const jwt = require('jsonwebtoken')
function authentication(req, res, next){
    const token = req.headers['authorization'];
    if(!token){
        return res.status(403).json({
            message: 'Invalid Token'
        })
    }
    const jwtHeader = token.substring(7); //jwjHeader: Bearer <token>
    try {
        // eslint-disable-next-line no-undef
        const validToken = jwt.verify(jwtHeader,process.env.SECRET);
        console.log('validToken', validToken);
        if(!validToken){
            return res.status(401).json('InValid');
        }
        req.body.user_id = validToken.user_id;
        next();
    } catch (error) {
        console.log(error);
        console.log('sai day ne');
        return res.status(401).json({
            message: "Invalid token!"
        })
    }
}
module.exports= authentication;