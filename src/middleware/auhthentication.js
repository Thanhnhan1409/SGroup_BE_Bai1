const jwt = require('jsonwebtoken')
function validateToken(req, res, next){
    const token = req.headers['authorization'];
    if(!token){
        return res.status(403).json({
            message: 'Invalid Token'
        })
    }
    const jwtHeader = token.substring(7); //jwjHeader: Bearer <token>
    try {
        // eslint-disable-next-line no-undef
        const isTokenValid = jwt.verify(jwtHeader,process.env.SECRET)
        if(!isTokenValid){
            console.log('token is inValid');
            return res.status(401).json('InValid');
        }
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Invalid token!"
        })
    }
}
module.exports= validateToken