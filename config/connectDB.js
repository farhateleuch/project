//require mongoose
const mongoose = require("mongoose");

// create DB
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.DB_URI)
      console.log("Database connected...")  
    } catch (error) {
        console.log("Can not connect !!!")
    }
}


// export DB
module.exports = connectDB