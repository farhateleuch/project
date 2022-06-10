// require mongoose
const mongoose = require("mongoose")

// schema
const {Schema , model} = mongoose

// creation schema
const UserSchema = new Schema({
    name : {type : String,required:true},
    email : {type : String,required:true},
    password : {type : String,required:true},
    phone : {type : Number},
    imageProfile : {type : String},
   
})

//export to the database model

module.exports = User = model("user",UserSchema)