

function valUpdate(req, res, next) {
  const {  name, age } =
    req.body;


  if (name.length < 2)
    return res.status(400).json("Name has to the length than 2!");

  if (age <= 0) return res.status(400).json("Age must be greater than 0!");
  const regexC =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/;

  if (!regexC.test(name))
    return res
      .status(400)
      .json("Name cannot contain numbers or special characters!");
  next();
}

module.exports = valUpdate;
