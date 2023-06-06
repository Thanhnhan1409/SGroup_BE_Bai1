require('dotenv').config()

function validateUpdate(req, res, next) {
    const {  fullname, age } =
      req.body;
  
  
    if (fullname.length < 2)
      return res.status(400).json("fullname has to the length than 2!");
  
    if (age <= 0) return res.status(400).json("Age must be greater than 0!");
    const regexC =
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/;
  
    if (!regexC.test(fullname))
      return res
        .status(400)
        .json("fullname cannot contain numbers or special characters!");
    next();
  }

  function validateLogin(req, res, next) {
    const { username, password } =
      req.body;
  
    if (username.length < 3)
      return res.status(400).json("Username has to the length than 3!");
  
    if (password.length < 3)
      return res.status(400).json("Password has to the length than 3!");
    next();
  }

  function validateUser(req, res, next) {
    // const  fullname = req.body.fullname;
    // const  age = req.body.age
    const { username, password, email,  fullname, age } =
      req.body;
  
    if (username.length < 3)
      return res.status(400).json("Username has to the length than 3!");
  
    if (password.length < 3)
      return res.status(400).json("Password has to the length than 3!");
    if (fullname.length < 2)
      return res.status(400).json("fullname has to the length than 2!");
  
    if (age <= 0) return res.status(400).json("Age must be greater than 0!");
    const regexC =
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/;
  
    if (!regexC.test(fullname))
      return res
        .status(400)
        .json("fullname cannot contain numbers or special characters!");
  
    const regexE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexE.test(email))
      return res.status(400).json("Email must contain @ character! ");
    next();
    // Cách 2: dùng thue viện unidecode
    // const nonAccentName = unidecode(fullname)
    // for( let i = 0; i< nonAccentName.length; i++){
    //     if(nonAccentName[i]===' ') continue;
    //     if(!(nonAccentName.charCodeAt(i) >= 65 && nonAccentName.charCodeAt(i) <= 90) || (nonAccentName.charCodeAt[i] >=97 && nonAccentName.charCodeAt[i] <=122))
    //         return res.status(400).json("fullname cannot contain numbers or special characters!");
    // }
    // next();
  }

  module.exports = {
    validateLogin,
    validateUpdate,
    validateUser
  }