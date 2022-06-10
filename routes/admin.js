// require express
const express = require("express")
const { register, login, getUser, getAllUser, deleteUser } = require("../controllers/admin")
const { deleteProduct } = require("../controllers/product")

const isAuthAdmin = require("../middleware/isAuthAdmin")
const { registerValidationAdmin, validationAdmin, loginValidationAdmin } = require("../middleware/validatorAdmin")
const User = require("../models/User")

// require express router
const router = express.Router()


// register
router.post("/register",registerValidationAdmin(),validationAdmin, register)

// login
router.post("/login",loginValidationAdmin(),validationAdmin, login)

// current user 
router.get("/current", isAuthAdmin, (req,res) => {
    res.send(req.admin) 
})
// 

// Get All User

router.get("/allUser",getAllUser)

// Delete User


router.delete('/:_id',deleteProduct) 

router.delete('/:_id',deleteUser) 







// export router
module.exports = router