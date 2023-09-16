const jwt = require('jsonwebtoken');

const getCreatedBy = async(req, res, next) => {
    const token = req.headers['authorization'];
    if(!token){
        return res.status(403).json({
            message: 'Invalid Token'
        })
    }
    const jwtHeader = token.substring(7);
    try {
        const verifyToken = jwt.verify(jwtHeader,process.env.SECRET)
        if(!verifyToken){
            console.log('token is inValid');
            return res.status(401).json({
                status: 'failed',
                message:'InValid Token '
            });
        }
        else {
            const created_by = verifyToken.user_id;
            req.body.created_by = created_by;
            console.log('req.body.created_by',req.body.created_by);
            next()
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Invalid token!"
        })
    }
}
module.exports = getCreatedBy;
