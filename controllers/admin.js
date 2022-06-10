
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const User = require("../models/User");


exports.register = async (req,res) =>{
    try {
        // req.body => newAdmin
        const { nameAdmin, emailAdmin, passwordAdmin, phoneAdmin } = req.body
        // chek if email exist
        const foundAdmin = await  Admin.findOne({emailAdmin})
        if (foundAdmin){
            return res.status(400).send({error:[{msg:'email exist..'}]})
        }
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(passwordAdmin,saltRounds)
        // const newAdmin
        const newAdmin = new Admin({...req.body})
        newAdmin.passwordAdmin = hashedPassword
        // save
        await newAdmin.save()
        // creation token
        const token = jwt.sign(
            {
                id: newAdmin._id
            },
            process.env.SECRET_KEYADMIN,
        {expiresIn:"1h"}
        )

        res.status(200).send({msg:"Register complit..",admin:newAdmin,token})
    } catch (error) {
        res.status(400).send({error:[{msg:'Can not register..'}]})
    }
}

exports.login = async (req,res) =>{ 
    try {
        const { emailAdmin , passwordAdmin } = req.body
        // check if email exist
        const foundAdmin = await Admin.findOne({emailAdmin})
        if(!foundAdmin){
            return res.status(400).send({errors:[{msg:'Bad credential 1..'}]})
        }
        const checkPassword = await bcrypt.compare(passwordAdmin,foundAdmin.passwordAdmin)
        if(!checkPassword){
            return res.status(400).send({errors:[{msg:'Bad credential 2..'}]})
        }

        // creation token
        const token = jwt.sign(
            {
                id: foundAdmin._id
            },
            process.env.SECRET_KEYADMIN,
        {expiresIn:"1h"}
        )

         res.status(200).send({msg:"login successfully...",admin :foundAdmin,token})
    } catch (error) {
         res.status(400).send({errors:[{msg:'Can not login!!!..'}]})
    }
}


exports.getAllUser = async(req,res)=>{
    try {
        res.status(200).send(await User.find())
    } catch (error) {
        res.status(400).send({msg: "Can not get All User !!!",error}) 
    }
}

exports.deleteUser = async(req,res)=>{
    try {
        const {_id} = req.params

        
         await User.findOneAndDelete({_id})
         res.status(200).send({msg:'User deleted..'})
     } catch (error) {
        res.status(400).send({msg:"can not delete User with this id!!!",error})
     } 
}



