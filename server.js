// require express
const express = require("express")


// create instance
const app = express()

// require cors
const cors = require('cors')
app.use(cors())

// require dotenv
require("dotenv").config()

// middleware global
app.use(express.json({limit: '200mb'}))

// connect DB
const connectDB = require("./config/connectDB")
connectDB()  

// Routing

app.get('/',(req,res)=>{
    res.send('hello farhat mern')
})


// midleware route 

app.use("/api/admin/",require("./routes/admin"))

app.use("/api/user/",require("./routes/user"))

app.use("/api/product/",require("./routes/product"))







// create PORT
const PORT = process.env.PORT || 5000



// create server
app.listen(PORT,(err=>err
    ? console.error(err)
    : console.log(`server runing on port ${PORT} ...`)
    ))