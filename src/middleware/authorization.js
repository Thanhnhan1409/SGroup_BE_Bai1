
function authorization(permissions) {
    return function(req, res, next) {
      const user_permissions = req.body && req.body.user_permissions;
      if (!user_permissions || !permissions.some(value => user_permissions.includes(value))) {
        return res.status(403).json({
          message: 'Invalid Authorization'
        });
      }
      next();
    };
  }
module.exports= authorization
