const mongoose = require('mongoose')

// database connection
const connectDB = async (url) => {
    await mongoose.set("strictQuery", true)
    await mongoose.connect(url, {
        useNewUrlParser: true 
    })
}

module.exports = connectDB