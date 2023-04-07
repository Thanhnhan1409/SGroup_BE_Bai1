

function validate(req, res, next){
    const  name = req.body.fullname;
    const  age = req.body.age
    if(age <= 0)
        return res.status(400).json("Age should be greater than 0!");
    const regexC = /[^a-zA-ZÀ-ỹ\s]/.test(name);
    const regexN = /\d/.test(name);
    if(regexC && regexN)
        return res.status(400).json("The name should be not contain the numbers or special char");
    next()

}

module.exports = validate;
