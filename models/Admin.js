const mongoose = require("mongoose")

// schema
const {Schema , model} = mongoose

// creation schema
const AdminSchema = new Schema({
    nameAdmin : {type : String,required:true},
    emailAdmin : {type : String,required:true},
    passwordAdmin : {type : String,required:true},
    phoneAdmin : {type : Number}
})

//export to the database model

module.exports = Admin = model("admin",AdminSchema) 