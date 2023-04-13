const unidecode = require("unidecode");


function validate(req, res, next){
    const  name = req.body.fullname;
    const  age = req.body.age
    if(age <= 0)
        return res.status(400).json("Age must be greater than 0!");
    const regexC = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/;
   
    const regexS = /@|\d|\./.test(name);
      
    if(!regexC.test(name) )
        return res.status(400).json("Name cannot contain numbers or special characters!");
    next()
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
