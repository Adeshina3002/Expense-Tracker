const express = require('express')
const connectDB = require('./db/connect')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

// application middlewares
app.use(cors)

app.get('/', (req, res) => {
    res.send("Welcome to your Expense Tracker")
})

const start = async () => {
    try {
        await connectDB (process.env.Mongo_URI)
        console.log("Database connected successfully...");
        app.listen (PORT, () => {
            console.log(`Server connected to http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log("Error connecting to database...", error.message);
    }
}

start()