const mongoose = require("mongoose")
require("dotenv").config()


const connectDB = async (DB_URL) => {
    try {
        await mongoose.connect(DB_URL)
        console.log("Database Connected Successully..");
    } catch (error) {
        console.error(error.message)
    }
}

module.exports = connectDB