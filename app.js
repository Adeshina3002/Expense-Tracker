const express = require('express')
const connectDB = require('./db/connect')
const cors = require('cors')
const cookieParser = require("cookie-parser")
require('dotenv').config()
const transactionRoutes = require('./routes/transactionRoutes') 
const authRoutes = require('./routes/authRoutes')
const { StatusCodes } = require('http-status-codes')
const morgan = require('morgan')

const app = express()
const PORT = process.env.PORT || 3000

// application middlewares
app.use(cookieParser(process.env.JWT_SECRET))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan("dev"))


app.get('/', (req, res) => {
    res.status(StatusCodes.OK).send("Welcome to your Expense Tracker")
})

app.use('/api/transaction', transactionRoutes)
app.use('/api/auth', authRoutes)

// incase of invalid routes from the client
app.get("/*", (req, res) => {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid URL" })
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