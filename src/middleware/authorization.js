const { getRoles } = require("../database/userQuery");

function authorization(role) {
    return async function(req, res, next) {
      console.log('vo đay r nè');
      const user_role = await getRoles('users.id',req.body.user_id) ;
      console.log('user_role', user_role);
      if (!user_role || !role.some(value => user_role.includes(value))) {
        return res.status(403).json({
          message: 'Invalid Authorization'
        });
      }
      next();
    };
  }
module.exports= authorization
