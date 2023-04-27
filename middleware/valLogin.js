function valLogin(req, res, next) {
  const { username, password } =
    req.body;

  if (username.length < 3)
    return res.status(400).json("Username has to the length than 3!");

  if (password.length < 3)
    return res.status(400).json("Password has to the length than 3!");
  next();
}

module.exports = valLogin;
