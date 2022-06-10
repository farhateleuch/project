const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


exports.register = async (req,res) =>{
    try {
        // req.body => newuser
        const { name, email, password, phone,imageProfile } = req.body
        // chek if email exist
        const foundUser = await User.findOne({email})
        if (foundUser){
            return res.status(400).send({error:[{msg:'email exist..'}]})
        }
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password,saltRounds)
        // const newuser
        const newUser = new User({...req.body})
        newUser.password = hashedPassword
        // save
        await newUser.save()
        // creation token
        const token = jwt.sign(
            {
                id: newUser._id
            },
            process.env.SECRET_KEY,
        {expiresIn:"1h"}
        )

        res.status(200).send({msg:"Register complit..",user:newUser,token})
    } catch (error) {
        res.status(400).send({error:[{msg:'Can not register..'}]})
    }
}

exports.login = async (req,res) =>{ 
    try {
        const { email , password } = req.body
        // check if email exist
        const foundUser = await User.findOne({email})
        if(!foundUser){
            return res.status(400).send({errors:[{msg:'Bad credential 1..'}]})
        }
        const checkPassword = await bcrypt.compare(password,foundUser.password)
        if(!checkPassword){
            return res.status(400).send({errors:[{msg:'Bad credential 2..'}]})
        }

        // creation token
        const token = jwt.sign(
            {
                id: foundUser._id
            },
            process.env.SECRET_KEY,
        {expiresIn:"1h"}
        )

         res.status(200).send({msg:"login successfully...",user :foundUser,token})
    } catch (error) {
         res.status(400).send({errors:[{msg:'Can not login!!!..'}]})
    }
}

exports.updateUser = async(req,res) => {

    try {
        const {_id} = req.params
        const result = await User.updateOne({_id},{$set :{...req.body}})
        res.status(200).send({msg:"User updated...",result})

    } catch (error) {
        res.status(400).send({msg: "Can not update User !!!",error})
    }
}

