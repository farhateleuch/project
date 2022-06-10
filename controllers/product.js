const Product = require("../models/Product");


exports.addProduct = async(req,res) => {
    try { 

        

        const newProduct = new Product ({
           

            name:req.body.name,
            productImage:req.body.product,
            size:req.body.size,
            categoris:req.body.categoris,
            color:req.body.color,
            price:req.body.price,
            inStock:req.body.inStock,
            nameUserProduct:req.body.nameUserProduct,
            idUserProduct:req.body.idUserProduct
            // user:user._id
           
        })
        await newProduct.save()
        res.status(200).send({msg: "Product added successfully ...",newProduct})
    } catch (error) {
        res.status(400).send({msg: "Can not add product !!!",error})
    }
}
 
exports.getProduct = async(req,res) =>{
    try {
        res.status(200).send(await Product.find())
    } catch (error) {
        res.status(400).send({msg: "Can not get product !!!",error}) 
    }
}

// exports.getProductByUser = async(req, res, id)



exports.getProductById = async(req,res) =>{
    try {
        const {_id} = req.params


        res.status(200).send(await Product.find({_id}))
    } catch (error) {
        res.status(400).send({msg: "Can not get product !!!",error}) 
    }
}










exports.deleteProduct = async(req,res)=>{
    try {
        const {_id} = req.params

        
         await Product.findOneAndDelete({_id})
         res.status(200).send({msg:'Product deleted..'})
     } catch (error) {
        res.status(400).send({msg:"can not delete product with this id!!!",error})
     } 
}

exports.updateProduct = async(req,res) => {

    try {
        const {_id} = req.params
        const result = await Product.updateOne({_id},{$set :{...req.body}})
        res.status(200).send({msg:"Product updated...",result})

    } catch (error) {
        res.status(400).send({msg: "Can not update product !!!",error})
    }
}




