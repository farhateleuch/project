const { check,validationResult} = require("express-validator")


exports.registerValidationAdmin = () => [
check("nameAdmin","Name is required !!").not().isEmpty(),
check("emailAdmin","Enter valid email !!").isEmail(),
check("passwordAdmin","Enter valid password !!").isLength({min:6})
]

exports.loginValidationAdmin = () => [
    check("emailAdmin","Enter valid email !!").isEmail(),
    check("passwordAdmin","Enter valid password !!").isLength({min:6})
]

exports.validationAdmin = ( req , res , next ) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }
    next()
}