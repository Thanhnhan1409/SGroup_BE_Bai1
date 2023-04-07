

function validate(req, res, next){
    const  name = req.body.fullname;
    const  age = req.body.age
    if(age <= 0)
        return res.status(400).json("Age must be greater than 0!");
    const regexC = /[^a-zA-ZÀ-ỹ\s]/.test(name);
    const regexN = /\d/.test(name);
    if(regexC && regexN)
        return res.status(400).json("Name cannot contain numbers or special characters!");
    next()

}

module.exports = validate;
