
function authorization(roles) {
    return function(req, res, next) {
      const user_role = req.body && req.body.user_role;
      if (!user_role || !roles.some(value => user_role.includes(value))) {
        return res.status(403).json({
          message: 'Invalid Authorization'
        });
      }
      next();
    };
  }
module.exports= authorization
