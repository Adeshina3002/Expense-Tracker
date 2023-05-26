const { StatusCodes } = require('http-status-codes')
const User = require('../models/userModel')
const { jwtTokenValidation, attachCookiesToResponse, createUserPayload } = require('../utils')

const registerAccount = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body 

        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(StatusCodes.NOT_ACCEPTABLE).json({status: 'error', message: "Email already exists"})
        }
        const user = await User.create(req.body)

        res.status(StatusCodes.CREATED).json({ status: "success", message: "Account created successfully", user })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error.message)
    }
}

const logIn = async (req, res) => {
    try {
        const { email, password } = req.body 

        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({ status: "error", message: "All fields are mandatory" })
        }

        const userExists = await User.findOne({ email })

        if (!userExists) {
            return res.status(StatusCodes.NOT_FOUND).json({status: "error", message: `User with email ${email} does not exists`})
        }

        const confirmPassword = await userExists.comparePassword(password)

        if (!confirmPassword) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ status: "error", message: "Invalid password, try again"})
        }

        const userPayload = createUserPayload(userExists)

        const token = attachCookiesToResponse({ res, user: userPayload })

        res.status(StatusCodes.OK).json({ status: "success", message: `Welcome ${userExists.firstName}`, token, user: userPayload })
         
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error.message)
    }
}

const logout = async (req, res) => {
    try {
        // res.cookie('token', 'logout', {
        //     httpOnly : true,
        //     expires : new Date( Date.now() + 1000)
        // }) 
        res.clearCookie('token'); // By clearing the token cookie, the client's authentication token will be removed, ensuring the user is properly logged out
        res.status(StatusCodes.OK).json({ status: "success", message: "User logged out" })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ status: "error", message: error.message })
    }
}


module.exports = {
    registerAccount,
    logIn,
    logout
}