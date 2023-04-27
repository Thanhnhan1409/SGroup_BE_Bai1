const unidecode = require("unidecode");

function validate(req, res, next) {
  // const  name = req.body.fullname;
  // const  age = req.body.age
  const { username, password, email,  name, age } =
    req.body;

  if (username.length < 3)
    return res.status(400).json("Username has to the length than 3!");

  if (password.length < 3)
    return res.status(400).json("Password has to the length than 3!");
  if (name.length < 2)
    return res.status(400).json("Name has to the length than 2!");

  if (age <= 0) return res.status(400).json("Age must be greater than 0!");
  const regexC =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/;

  if (!regexC.test(name))
    return res
      .status(400)
      .json("Name cannot contain numbers or special characters!");

  const regexE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexE.test(email))
    return res.status(400).json("Email must contain @ character! ");
  next();
  // Cách 2: dùng thue viện unidecode
  // const nonAccentName = unidecode(name)
  // for( let i = 0; i< nonAccentName.length; i++){
  //     if(nonAccentName[i]===' ') continue;
  //     if(!(nonAccentName.charCodeAt(i) >= 65 && nonAccentName.charCodeAt(i) <= 90) || (nonAccentName.charCodeAt[i] >=97 && nonAccentName.charCodeAt[i] <=122))
  //         return res.status(400).json("Name cannot contain numbers or special characters!");
  // }
  // next();
}

module.exports = validate;
