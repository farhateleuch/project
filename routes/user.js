// require express
const express = require("express")
const { deleteProduct } = require("../controllers/product")
const { register, login, getUser, updateUser } = require("../controllers/user")
const isAuth = require("../middleware/isAuth")
const { registerValidation, validation, loginValidation } = require("../middleware/validator")

// require express router
const router = express.Router()


// register
router.post("/register",registerValidation(),validation, register)

// login
router.post("/login",loginValidation(),validation, login)

// current user 
router.get("/current", isAuth, (req,res) => {
    res.send(req.user)
})

// Update User
 router.put("/login/:_id",updateUser)

 router.delete('/:_id',deleteProduct) 

// export router
module.exports = router