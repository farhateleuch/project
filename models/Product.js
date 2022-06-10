// require mongoose
const mongoose = require('mongoose')

// create schema
const schema = mongoose.Schema

const productSchema = new schema({

    name : {
        type : String,
        required : true
    },
    productImage : {
        type : String
    },

    size : {
        type : String,
        required : true
    },
    categoris : {
        type : String
    },
    color : {
        type : Array
    },
    price: {
        type : Number
    },
     
    nameUserProduct:{
          type : String
      },

       
    idUserProduct:{
            type : String
        },


    inStock:{
        type: Boolean
        

    }
})

module.exports = Product = mongoose.model('product',productSchema)