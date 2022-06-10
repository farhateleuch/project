// require express
const express = require("express")
const { addProduct, getProduct, deleteProduct, updateProduct, getProductById } = require("../controllers/product")

// require express router
const router = express.Router()







// crud product

router.post('/',addProduct)

router.get('/',getProduct)

router.get('/:_id',getProductById)


router.delete('/:_id',deleteProduct) 

router.put('/:_id',updateProduct)









// export router
module.exports = router